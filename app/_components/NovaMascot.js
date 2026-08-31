"use client";

import { useId } from "react";
import styles from "../auth.module.css";

export default function NovaMascot({ pose = "idle", feedback = "idle" }) {
  const id = useId().replace(/:/g, "");
  return (
    <div
      className={styles.mascot}
      data-pose={pose}
      data-feedback={feedback}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 280 194"
        width="280"
        height="194"
        fill="none"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={`${id}-shell`}
            x1="87"
            y1="48"
            x2="199"
            y2="181"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#464152" />
            <stop offset=".48" stopColor="#282532" />
            <stop offset="1" stopColor="#1a1922" />
          </linearGradient>
          <linearGradient
            id={`${id}-ear`}
            x1="90"
            y1="24"
            x2="114"
            y2="92"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b9a0f0" />
            <stop offset="1" stopColor="#64537c" />
          </linearGradient>
          <linearGradient id={`${id}-paw`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#50435f" />
            <stop offset="1" stopColor="#2e283d" />
          </linearGradient>
          <radialGradient id={`${id}-aura`}>
            <stop stopColor="#ac87ff" stopOpacity=".13" />
            <stop offset="1" stopColor="#ac87ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="140" cy="111" rx="134" ry="78" fill={`url(#${id}-aura)`} />
        <ellipse cx="140" cy="178" rx="68" ry="6" fill="#000" opacity=".35" />
        <g className={styles.creature}>
          <path
            d="M100 136c-7 8-15 25-13 42h106c2-17-6-34-13-42"
            fill={`url(#${id}-shell)`}
            stroke="#766385"
            strokeOpacity=".3"
          />
          <path
            d="m122 168 18 10 18-10"
            stroke="#8e72b6"
            strokeOpacity=".45"
            strokeWidth="1.3"
          />
          <g className={styles.head}>
            <path
              d="m82 83 3-57c0-4 4-5 7-2l32 32M156 56l32-32c3-3 7-2 7 2l3 57"
              fill={`url(#${id}-shell)`}
              stroke="#8d7c9e"
              strokeOpacity=".55"
              strokeWidth="1.3"
            />
            <path
              d="m92 69 1-33 24 24M163 60l24-24 1 33"
              fill={`url(#${id}-ear)`}
              opacity=".8"
            />
            <path
              d="M78 96c0-30 27-49 62-49s62 19 62 49v13c0 29-27 48-62 48s-62-19-62-48V96Z"
              fill={`url(#${id}-shell)`}
              stroke="#746780"
              strokeOpacity=".6"
              strokeWidth="1.5"
            />
            <path
              d="M102 61c11-5 24-8 38-8s27 3 38 8"
              stroke="#cec2e5"
              strokeOpacity=".22"
              strokeLinecap="round"
            />
            <path
              d="M89 94c0-14 18-20 34-14l17 6 17-6c16-6 34 0 34 14v12c0 21-24 36-51 36s-51-15-51-36V94Z"
              fill="#12131c"
              stroke="#5c506e"
              strokeOpacity=".6"
            />
            <g className={styles.eyes}>
              <g className={styles.pupils}>
                <rect
                  x="108"
                  y="97"
                  width="10"
                  height="17"
                  rx="5"
                  fill="#cfbcff"
                />
                <rect
                  x="162"
                  y="97"
                  width="10"
                  height="17"
                  rx="5"
                  fill="#cfbcff"
                />
                <rect
                  x="111"
                  y="99"
                  width="3"
                  height="5"
                  rx="1.5"
                  fill="#f9f5ff"
                />
                <rect
                  x="165"
                  y="99"
                  width="3"
                  height="5"
                  rx="1.5"
                  fill="#f9f5ff"
                />
              </g>
            </g>
            <path
              d="m136 121 4 3 4-3"
              stroke="#a395b7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className={styles.smile}
              d="M135 129q5 5 10 0"
              stroke="#8d7ba5"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="m72 108-10-3m10 11-9 2m145-10 10-3m-10 11 9 2"
              stroke="#867194"
              strokeOpacity=".7"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="m136 63 4-5 4 5-4 5-4-5Z"
              className={styles.forehead}
              fill="#bca1ef"
            />
          </g>
          <g className={styles.leftPaw}>
            <rect
              x="83"
              y="153"
              width="34"
              height="27"
              rx="13"
              fill={`url(#${id}-paw)`}
              stroke="#887496"
              strokeOpacity=".6"
            />
            <path
              d="M94 163v7m7-7v7"
              stroke="#c1a7d8"
              strokeOpacity=".4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
          <g className={styles.rightPaw}>
            <rect
              x="163"
              y="153"
              width="34"
              height="27"
              rx="13"
              fill={`url(#${id}-paw)`}
              stroke="#887496"
              strokeOpacity=".6"
            />
            <path
              d="M179 163v7m7-7v7"
              stroke="#c1a7d8"
              strokeOpacity=".4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
