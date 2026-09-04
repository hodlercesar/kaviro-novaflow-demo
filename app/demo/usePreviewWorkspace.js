"use client";

import { useCallback, useMemo, useState } from "react";
import {
  cloneSeedActivity,
  cloneSeedAutomations,
  cloneSeedDeals,
} from "../../lib/demo-data.mjs";
import { calculateForecast } from "../../lib/novaflow.mjs";

const DEFAULT_PREFERENCES = Object.freeze({
  weekly: true,
  risk: true,
  activity: false,
});

const PREVIEW_SYNC = Object.freeze({
  state: "local",
  label: "Instant preview · not saved",
  source: "preview",
});

export function usePreviewWorkspace() {
  const [deals, setDeals] = useState(cloneSeedDeals);
  const [automations, setAutomations] = useState(cloneSeedAutomations);
  const [activity, setActivity] = useState(cloneSeedActivity);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  const forecast = useMemo(() => calculateForecast(deals), [deals]);

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
    addActivity("Instant preview reset to the fictional evaluation baseline");
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
    sync: PREVIEW_SYNC,
    hydrated: true,
    metrics: forecast.metrics,
    stageTotals: forecast.stageTotals,
    forecastSource: "Local evaluation",
  };
}
