'use client'
import { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number; // in seconds
  onComplete: () => void;
}

export default function Timer({ initialTime, onComplete }: TimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      onComplete();
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, onComplete]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-bold text-red-600">{time}s</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => setIsRunning(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Pause
        </button>
        <button
          onClick={() => setTime(initialTime)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}