'use client'
import { useState } from 'react';

export default function Calendar() {
  const [currentMonth] = useState(new Date());
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const trainingDays = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29]; // Exemple

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Calendrier</h1>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`p-4 text-center rounded-lg ${
              trainingDays.includes(day) ? 'bg-blue-200' : 'bg-green-200'
            }`}
          >
            <p>{day}</p>
            <p className="text-sm">{trainingDays.includes(day) ? 'Entraînement' : 'Repos'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}