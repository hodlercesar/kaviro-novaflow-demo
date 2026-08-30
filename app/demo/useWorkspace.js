"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  cloneSeedActivity,
  cloneSeedAutomations,
  cloneSeedDeals,
} from "../../lib/demo-data.mjs";
import { calculateForecast, validateDeals } from "../../lib/novaflow.mjs";

const STORAGE_VERSION = 2;
const DEFAULT_PREFERENCES = Object.freeze({
  weekly: true,
  risk: true,
  activity: false,
});

function localKey(userId) {
  return `novaflow:workspace:v${STORAGE_VERSION}:${userId}`;
}

function safeAutomations(value) {
  if (!Array.isArray(value)) return null;
  const known = new Map(cloneSeedAutomations().map((item) => [item.id, item]));
  return value
    .map((item) => {
      const baseline = known.get(item?.id);
      if (!baseline) return null;
      return {
        ...baseline,
        enabled: Boolean(item.enabled),
        runs: Number.isInteger(item.runs)
          ? Math.max(0, Math.min(item.runs, 999))
          : baseline.runs,
      };
    })
    .filter(Boolean);
}

function safeActivity(value) {
  if (!Array.isArray(value)) return null;
  return value
    .slice(0, 20)
    .map((item, index) => {
      if (!item || typeof item.text !== "string") return null;
      const text = item.text.trim().slice(0, 180);
      if (!text) return null;
      return {
        id:
          typeof item.id === "string" && item.id.length <= 100
            ? item.id
            : `local-${index}`,
        text,
        time:
          typeof item.time === "string" ? item.time.trim().slice(0, 20) : "",
      };
    })
    .filter(Boolean);
}

function safePreferences(value) {
  if (!value || typeof value !== "object") return null;
  return Object.fromEntries(
    Object.keys(DEFAULT_PREFERENCES).map((key) => [
      key,
      typeof value[key] === "boolean" ? value[key] : DEFAULT_PREFERENCES[key],
    ]),
  );
}

function safeLocalState(userId) {
  if (!userId) return null;
  try {
    const raw = window.localStorage.getItem(localKey(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const deals = validateDeals(parsed?.deals);
    return {
      deals: deals.success ? deals.data : null,
      automations: safeAutomations(parsed?.automations),
      activity: safeActivity(parsed?.activity),
      preferences: safePreferences(parsed?.preferences),
    };
  } catch {
    return null;
  }
}

export function useWorkspace(userId) {
  const [deals, setDeals] = useState(cloneSeedDeals);
  const [automations, setAutomations] = useState(cloneSeedAutomations);
  const [activity, setActivity] = useState(cloneSeedActivity);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [sync, setSync] = useState({
    state: "loading",
    label: "Loading workspace",
    source: "initial",
  });
  const [hydratedUserId, setHydratedUserId] = useState(null);
  const hydrated = Boolean(userId && hydratedUserId === userId);
  const generation = useRef(0);
  const lastPersistedDeals = useRef(null);

  useEffect(() => {
    if (!userId) return undefined;
    const controller = new AbortController();
    const currentGeneration = ++generation.current;
    lastPersistedDeals.current = null;

    async function hydrate() {
      const local = safeLocalState(userId);
      setAutomations(local?.automations || cloneSeedAutomations());
      setActivity(local?.activity || cloneSeedActivity());
      setPreferences(local?.preferences || DEFAULT_PREFERENCES);

      try {
        const response = await fetch("/api/deals", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Workspace service unavailable");
        const data = await response.json();
        if (currentGeneration !== generation.current) return;

        const stored = validateDeals(data.deals);
        if (data.deals !== null && stored.success) {
          setDeals(stored.data);
          lastPersistedDeals.current = JSON.stringify(stored.data);
          setSync({ state: "saved", label: "Saved to Neon", source: "neon" });
        } else if (local?.deals) {
          setDeals(local.deals);
          setSync({
            state: "local",
            label: "Restored locally",
            source: "local",
          });
        } else {
          setDeals(cloneSeedDeals());
          setSync({
            state: "local",
            label: "Fictional starter data",
            source: "seed",
          });
        }
      } catch (error) {
        if (
          error.name === "AbortError" ||
          currentGeneration !== generation.current
        )
          return;
        setDeals(local?.deals || cloneSeedDeals());
        setSync({
          state: "local",
          label: "Local fallback active",
          source: "local",
        });
      } finally {
        if (
          !controller.signal.aborted &&
          currentGeneration === generation.current
        )
          setHydratedUserId(userId);
      }
    }

    hydrate();
    return () => controller.abort();
  }, [userId]);

  useEffect(() => {
    if (!hydrated || !userId) return undefined;

    try {
      window.localStorage.setItem(
        localKey(userId),
        JSON.stringify({
          deals,
          automations,
          activity: activity.slice(0, 20),
          preferences,
        }),
      );
    } catch {
      // The server remains the canonical source when browser storage is unavailable.
    }
    return undefined;
  }, [activity, automations, deals, hydrated, preferences, userId]);

  useEffect(() => {
    if (!hydrated || !userId) return undefined;
    const serializedDeals = JSON.stringify(deals);
    if (serializedDeals === lastPersistedDeals.current) return undefined;
    const controller = new AbortController();
    setSync((current) => ({
      ...current,
      state: "saving",
      label: "Saving changes",
    }));
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/deals", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deals }),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Save failed");
        lastPersistedDeals.current = serializedDeals;
        setSync({ state: "saved", label: "Saved to Neon", source: "neon" });
      } catch (error) {
        if (error.name !== "AbortError") {
          setSync({
            state: "local",
            label: "Saved in this browser",
            source: "local",
          });
        }
      }
    }, 650);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [deals, hydrated, userId]);

  const localForecast = useMemo(() => calculateForecast(deals), [deals]);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (!hydrated) return undefined;
    setForecast(null);
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/forecast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deals }),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Forecast unavailable");
        setForecast(await response.json());
      } catch (error) {
        if (error.name !== "AbortError") setForecast(null);
      }
    }, 250);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [deals, hydrated]);

  const addActivity = useCallback((text) => {
    setActivity((current) =>
      [{ id: crypto.randomUUID(), text, time: "now" }, ...current].slice(0, 20),
    );
  }, []);

  const resetWorkspace = useCallback(() => {
    setDeals(cloneSeedDeals());
    setAutomations(cloneSeedAutomations());
    setActivity(cloneSeedActivity());
    setPreferences(DEFAULT_PREFERENCES);
    addActivity("Workspace reset to the fictional evaluation baseline");
  }, [addActivity]);

  return {
    deals,
    setDeals,
    automations,
    setAutomations,
    activity,
    addActivity,
    preferences,
    setPreferences,
    resetWorkspace,
    sync,
    hydrated,
    metrics: forecast?.metrics || localForecast.metrics,
    stageTotals: forecast?.stageTotals || localForecast.stageTotals,
    forecastSource: forecast ? "Server verified" : "Local fallback",
  };
}
