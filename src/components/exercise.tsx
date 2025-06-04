'use client'
import Timer from "@/components/timer";

interface ExerciseProps {
  exercise: {
    name: string;
    sets: number;
    reps?: number;
    duration?: number;
    rest: number;
  };
}

export default function Exercise({ exercise }: ExerciseProps) {
  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-blue-600">{exercise.name}</h2>
      <p>
        {exercise.reps ? `${exercise.sets} séries de ${exercise.reps} répétitions` : `${exercise.sets} séries`}
      </p>
      {exercise.duration && (
        <div className="mt-2">
          <p>Temps par série :</p>
          <Timer initialTime={exercise.duration} onComplete={() => alert('Série terminée !')} />
        </div>
      )}
      <div className="mt-2">
        <p>Repos entre séries :</p>
        <Timer initialTime={exercise.rest} onComplete={() => alert('Repos terminé !')} />
      </div>
    </div>
  );
}