"use client";
import { Calendar } from "@/components/calendar";
import { Stats } from "@/components/stats";
import { useState } from "react";

export function StartWorkout() {
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(0);

  const start = () => {
    setStarted(true);
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      setTimer(seconds);
    }, 1000);
    setTimeout(() => clearInterval(interval), 60 * 1000); // Ex. 1 min
  };

  return (
    <div className="mb-6 bg-white rounded-xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-2">Séance du jour</h2>
      {!started ? (
        <button onClick={start} className="bg-blue-500 text-white px-4 py-2 rounded">
          Commencer
        </button>
      ) : (
        <p>Temps écoulé : {timer}s</p>
      )}
    </div>
  );
}