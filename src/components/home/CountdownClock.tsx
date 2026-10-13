import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownClockProps {
  initialHours: number;
  initialMinutes: number;
  initialSeconds: number;
  variant?: 'boxed' | 'pill';
  label?: string;
  className?: string;
}

/**
 * Isolated countdown clock component.
 * By isolating the 1-second interval to this self-contained leaf component,
 * parent sections (and their dozens of child ProductCard components) are
 * spared from 1000ms re-rendering cycles that cause severe memory and CPU churn.
 */
export const CountdownClock: React.FC<CountdownClockProps> = React.memo(({
  initialHours,
  initialMinutes,
  initialSeconds,
  variant = 'boxed',
  label = 'Ends In:',
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
      if (timerId) clearInterval(timerId);
      timerId = setInterval(() => {
        // Skip interval execution if document is currently hidden (tab in background)
        if (typeof document !== 'undefined' && document.hidden) return;

        setTimeLeft((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else if (prev.hours > 0) {
            return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
          } else {
            return { hours: initialHours, minutes: initialMinutes, seconds: initialSeconds };
          }
        });
      }, 1000);
    };

    startTimer();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerId) clearInterval(timerId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [initialHours, initialMinutes, initialSeconds]);

  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF3FF] text-[#2962FF] text-[10px] font-black uppercase tracking-wider font-heading border border-[#DBEAFE] ${className}`}
      >
        <Clock className="w-3 h-3 text-[#2962FF]" />
        <span>
          {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s remaining
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 bg-[#EEF3FF]/70 border border-[#DBEAFE] px-3.5 py-1.5 rounded-2xl shadow-2xs self-start sm:self-auto ${className}`}
    >
      <Clock className="w-4 h-4 text-[#2962FF]" />
      <span className="text-xs font-bold text-[#172033] font-body">{label}</span>
      <div className="flex items-center gap-1 font-mono text-xs font-black text-[#2962FF]">
        <span className="bg-white px-1.5 py-0.5 rounded-md min-w-[24px] text-center shadow-2xs border border-[#E5EAF3]">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span>:</span>
        <span className="bg-white px-1.5 py-0.5 rounded-md min-w-[24px] text-center shadow-2xs border border-[#E5EAF3]">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span>:</span>
        <span className="bg-white px-1.5 py-0.5 rounded-md min-w-[24px] text-center shadow-2xs border border-[#E5EAF3]">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
});

CountdownClock.displayName = 'CountdownClock';
