"use client";

import { useEffect, useState } from "react";

interface CircularCountdownProps {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  size?: number; // circle size in px
  strokeWidth?: number; // thickness of circle
  storageKey?: string;
}

export default function CircularCountdown({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  size = 100,
  strokeWidth = 8,
  storageKey = "circular_timer",
}: CircularCountdownProps) {
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;

  // ✅ Setup target time
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    let target: number;
    const now = Date.now();
    const newTarget = now + totalSeconds * 1000;

    if (stored && parseInt(stored, 10) > now) {
      target = parseInt(stored, 10);
    } else {
      target = newTarget;
      localStorage.setItem(storageKey, target.toString());
    }

    setTargetTime(target);
  }, [storageKey, totalSeconds]);

  // ✅ Update countdown
  useEffect(() => {
    if (!targetTime) {
      return undefined;
    }

    const update = () => {
      const diff = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
      setTimeLeft(diff);
      if (diff <= 0) {
        localStorage.removeItem(storageKey);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetTime, storageKey]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (timeLeft / totalSeconds) * circumference;

  // ✅ Format display text
  const d = Math.floor(timeLeft / 86400);
  const h = Math.floor((timeLeft % 86400) / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  let display = "";
  if (d > 0) {
    display = `${d}d ${h}h`;
  } else if (h > 0) {
    display = `${h}h ${m}m`;
  } else if (m > 0) {
    display = `${m}m ${s}s`;
  } else {
    display = `0m ${s}s`;
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* background circle */}
        <circle
          className="stroke-background-2"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          className="transition-all duration-500 ease-linear stroke-white"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <span className="text-xs text-white/70">Ends in</span>
        <span className="text-lg font-semibold">{display}</span>
      </div>
    </div>
  );
}
