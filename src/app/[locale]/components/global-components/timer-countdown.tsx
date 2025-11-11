"use client";

import { useEffect, useState } from "react";

interface TimerCountdownProps {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  storageKey?: string; // 👈 unique key to persist each timer separately
}

export default function TimerCountdown({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  storageKey = "default_timer",
}: TimerCountdownProps) {
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    let target: number;

    // Calculate target time from props
    const now = Date.now();
    const totalMs =
      (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000;
    const newTarget = now + totalMs;

    // If stored value exists and is in the future, reuse it
    // Otherwise, overwrite with new one (e.g., when countdown resets)
    if (stored && parseInt(stored, 10) > Date.now()) {
      target = parseInt(stored, 10);
    } else {
      target = newTarget;
      localStorage.setItem(storageKey, target.toString());
    }

    setTargetTime(target);
  }, [days, hours, minutes, seconds, storageKey]);


  useEffect(() => {
    if (targetTime) {
      const updateTimer = () => {
        const diff = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
        setTimeLeft(diff);
        if (diff <= 0) {
          localStorage.removeItem(storageKey);
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval); // cleanup function
    }

    return undefined;
  }, [targetTime, storageKey]);



  const formatTime = (totalSeconds: number) => {
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return {
      d: d.toString().padStart(2, "0"),
      h: h.toString().padStart(2, "0"),
      m: m.toString().padStart(2, "0"),
      s: s.toString().padStart(2, "0"),
    };
  };

  const { d, h, m, s } = formatTime(timeLeft);

  return (
    <div className="flex items-center justify-center gap-1 text-base">
      <div className="bg-background rounded-sm px-3 py-2 text-center max-w-16 w-full">
        <div className="text-white font-semibold">{d}</div>
        <div className="text-white/55">Day</div>
      </div>
      <div className="bg-background rounded-sm px-3 py-2 text-center max-w-16 w-full">
        <div className="text-white font-semibold">{h}</div>
        <div className="text-white/55">Hour</div>
      </div>
      <div className="bg-background rounded-sm px-3 py-2 text-center max-w-16 w-full">
        <div className="text-white font-semibold">{m}</div>
        <div className="text-white/55">Min</div>
      </div>
      <div className="bg-background rounded-sm px-3 py-2 text-center max-w-16 w-full">
        <div className="text-white font-semibold">{s}</div>
        <div className="text-white/55">Sec</div>
      </div>
    </div>
  );
}
