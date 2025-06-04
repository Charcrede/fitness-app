'use client'
import Exercise from '@/components/exercise';
import { useState } from 'react';

const exercises = [
  { name: 'Squats', sets: 3, reps: 10, rest: 60 },
  { name: 'Planche', sets: 3, duration: 30, rest: 30 },
  { name: 'Pompes', sets: 3, reps: 15, rest: 45 },
];

export default function Workout() {
  const [completed, setCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const handleComplete = () => {
    setCompleted(true);
    setTimeSpent(45); // Exemple : 45 minutes
    setCaloriesBurned(300); // Estimation : 300 calories
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Séance du jour</h1>
      {!completed ? (
        <div>
          {exercises.map((exercise, index) => (
            <Exercise key={index} exercise={exercise} />
          ))}
          <button
            onClick={handleComplete}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Terminer la séance
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Séance terminée !</h2>
          <p>Temps passé : {timeSpent} minutes</p>
          <p>Calories brûlées : {caloriesBurned} kcal</p>
          <p className="mt-4 text-lg text-gray-700">Bravo, continue comme ça !</p>
        </div>
      )}
    </div>
  );
}