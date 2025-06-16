'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Calendar, Trophy, Target, Clock, Flame } from 'lucide-react';

// Types
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  duration?: number;
  description: string;
  restTime: number;
  video?: string; // <- nouveau champ
}


interface WorkoutDay {
  id: number;
  name: string;
  warmup: Exercise[];
  workout: Exercise[];
  cooldown: Exercise[];
  estimatedCalories: number;
}

interface WorkoutSession {
  date: string;
  dayId: number;
  duration: number;
  calories: number;
  completed: boolean;
}

// Data
// const workoutProgram: WorkoutDay[] = [
//   {
//     id: 1,
//     name: "Haut du corps",
//     estimatedCalories: 280,
//     warmup: [
//       { name: "Jumping jacks", sets: 1, reps: "2 min", duration: 120, description: "Pour monter le cardio", restTime: 0 },
//       { name: "Rotations des bras", sets: 2, reps: "30 sec", duration: 30, description: "Dans chaque sens", restTime: 10 },
//       { name: "Montées de genoux", sets: 1, reps: "2 min", duration: 120, description: "Sur place", restTime: 0 },
//       { name: "Planche dynamique", sets: 1, reps: "1 min", duration: 60, description: "Alterne planche coudes/mains", restTime: 0 }
//     ],
//     workout: [
//       { name: "Pompes classiques", sets: 3, reps: "10-15", description: "Corps droit, poitrine au sol", restTime: 60 },
//       { name: "Pompes diamant", sets: 3, reps: "8-12", description: "Mains en triangle", restTime: 60 },
//       { name: "Dips sur chaise", sets: 3, reps: "10-15", description: "Descends le bassin vers le sol", restTime: 60 },
//       { name: "Planche latérale", sets: 3, reps: "20-30 sec", duration: 30, description: "Corps droit, chaque côté", restTime: 45 },
//       { name: "Mountain climbers", sets: 3, reps: "30-45 sec", duration: 45, description: "Genoux vers poitrine, rapide", restTime: 60 },
//       { name: "Relevés de buste", sets: 3, reps: "15-20", description: "Buste vers genoux", restTime: 60 }
//     ],
//     cooldown: [
//       { name: "Étirement pecs", sets: 2, reps: "30 sec", duration: 30, description: "Bras en L dans porte", restTime: 10 },
//       { name: "Étirement tronc", sets: 2, reps: "30 sec", duration: 30, description: "Rotation assise", restTime: 10 },
//       { name: "Respiration profonde", sets: 1, reps: "1-2 min", duration: 90, description: "4 sec inspire, 6 sec expire", restTime: 0 }
//     ]
//   },
//   {
//     id: 2,
//     name: "Bas du corps et cardio",
//     estimatedCalories: 320,
//     warmup: [
//       { name: "Squats lents", sets: 1, reps: "2 min", duration: 120, description: "Sans poids", restTime: 0 },
//       { name: "Fentes marchées", sets: 1, reps: "1 min", duration: 60, description: "Alternées", restTime: 0 },
//       { name: "Cercles de hanches", sets: 2, reps: "30 sec", duration: 30, description: "Chaque sens", restTime: 10 },
//       { name: "Sauts sur place", sets: 1, reps: "2 min", duration: 120, description: "Échauffement cardio", restTime: 0 }
//     ],
//     workout: [
//       { name: "Squats au poids du corps", sets: 3, reps: "15-20", description: "Cuisses parallèles", restTime: 60 },
//       { name: "Fentes avant", sets: 3, reps: "10-12/jambe", description: "Genou arrière vers sol", restTime: 60 },
//       { name: "Pont fessier", sets: 3, reps: "15-20", description: "Soulève bassin, serre fessiers", restTime: 45 },
//       { name: "Squat sauté", sets: 3, reps: "10-15", description: "Squat puis saut explosif", restTime: 75 },
//       { name: "Planche levée jambe", sets: 3, reps: "10-12/jambe", description: "Jambe tendue, 1 sec", restTime: 60 },
//       { name: "Burpees", sets: 3, reps: "8-12", description: "Squat-planche-squat-saut", restTime: 90 }
//     ],
//     cooldown: [
//       { name: "Étirement quadriceps", sets: 2, reps: "30 sec", duration: 30, description: "Pied vers fessiers", restTime: 10 },
//       { name: "Étirement fessiers", sets: 2, reps: "30 sec", duration: 30, description: "Genou vers poitrine", restTime: 10 },
//       { name: "Respiration profonde", sets: 1, reps: "1-2 min", duration: 90, description: "Récupération", restTime: 0 }
//     ]
//   },
//   {
//     id: 3,
//     name: "Full body et core",
//     estimatedCalories: 300,
//     warmup: [
//       { name: "Jumping jacks", sets: 1, reps: "2 min", duration: 120, description: "Cardio activation", restTime: 0 },
//       { name: "Rotations du buste", sets: 1, reps: "1 min", duration: 60, description: "Mobilité tronc", restTime: 0 },
//       { name: "Genoux hauts", sets: 1, reps: "2 min", duration: 120, description: "Sur place", restTime: 0 },
//       { name: "Planche", sets: 1, reps: "30-60 sec", duration: 45, description: "Position statique", restTime: 0 }
//     ],
//     workout: [
//       { name: "Pompes inclinées", sets: 3, reps: "10-15", description: "Mains surélevées", restTime: 60 },
//       { name: "Squat avec rotation", sets: 3, reps: "10-12/côté", description: "Tourne buste en remontant", restTime: 60 },
//       { name: "Planche touche épaule", sets: 3, reps: "20 touches", description: "Corps stable, alterne", restTime: 60 },
//       { name: "Bicycle crunches", sets: 3, reps: "15-20/côté", description: "Coude-genou opposés", restTime: 45 },
//       { name: "Burpees", sets: 3, reps: "8-12", description: "Intensité maximale", restTime: 90 },
//       { name: "Russian twists", sets: 3, reps: "20-30", description: "Buste penché, tourne", restTime: 60 }
//     ],
//     cooldown: [
//       { name: "Position enfant", sets: 1, reps: "30 sec", duration: 30, description: "Étirement dos", restTime: 0 },
//       { name: "Étirement abdos", sets: 1, reps: "30 sec", duration: 30, description: "Arque le dos", restTime: 0 },
//       { name: "Respiration profonde", sets: 1, reps: "1-2 min", duration: 90, description: "Relaxation", restTime: 0 }
//     ]
//   }
// ];

const workoutProgram: WorkoutDay[] = [
  {
    id: 1,
    name: "Full body workout",
    estimatedCalories: 300,
    warmup: [
      { name: "Lever de genoux", sets: 1, reps: "20 sec", duration: 20, description: "Activation cardio", restTime: 15, video: "https://www.youtube.com/watch?v=YUpeReHQl_w" },
      { name: "Jumping jacks", sets: 1, reps: "30 sec", duration: 30, description: "Échauffement cardio", restTime: 15, video: "https://www.youtube.com/watch?v=5X1tK41fJgM" }
    ],
    workout: [
      { name: "Abdos debout", sets: 1, reps: "24", description: "Contrôle du mouvement", restTime: 45, video: "https://www.youtube.com/watch?v=idfxeOpIJdM" },
      { name: "Escalade", sets: 1, reps: "24", description: "Dos droit", restTime: 45, video: "https://www.youtube.com/watch?v=92V8s54o88Q" },
      { name: "Crunch abdominal", sets: 1, reps: "14", description: "Abdos contractés", restTime: 30, video: "https://youtu.be/C0NQqI9YeyQ?si=Ki1oIfjQOml7y3Xl" },
      { name: "Twist russe", sets: 1, reps: "16", description: "Rotation contrôlée", restTime: 30, video: "https://www.youtube.com/watch?v=779lZlD7r1s" },
      { name: "Planche", sets: 1, reps: "40 sec", duration: 40, description: "Gaine bien les abdos", restTime: 30, video: "https://www.youtube.com/watch?v=6OVJ9em09ro" },
      { name: "Renforcement des abdos", sets: 1, reps: "12", description: "Contrôle du mouvement", restTime: 30, video: "https://www.youtube.com/watch?v=53KzU1lT7yI" },
      { name: "Gainage latéral gauche en T", sets: 1, reps: "3", description: "Garde les bras tendus", restTime: 30, video: "https://www.youtube.com/watch?v=EkO6B-AY2lU" },
      { name: "Gainage latéral droit en T", sets: 1, reps: "3", description: "Garde les bras tendus", restTime: 30, video: "https://www.youtube.com/watch?v=EkO6B-AY2lU" },
      { name: "Crunch à l’envers", sets: 1, reps: "12", description: "Contrôle du mouvement", restTime: 30, video: "https://www.youtube.com/watch?v=XY8KzdDcMFg" },
      { name: "Hanches pont", sets: 1, reps: "16", description: "Contracte fessiers", restTime: 30, video: "https://www.youtube.com/watch?v=79zVxQyXlY4" },
      { name: "Toucher les talons", sets: 1, reps: "20", description: "Abdos engagés", restTime: 30, video: "https://www.youtube.com/watch?v=9bR-elyolBQ" }
    ],
    cooldown: [
      { name: "Étirement cobra", sets: 1, reps: "30 sec", duration: 30, description: "Étirement dos", restTime: 15, video: "https://www.youtube.com/watch?v=JDcdhTuycOI" },
      { name: "Étirement allongé avec torsion gauche", sets: 1, reps: "30 sec", duration: 30, description: "Étirement oblique", restTime: 15, video: "https://www.youtube.com/watch?v=ezyMaQEaVaI" },
      { name: "Étirement allongé avec torsion droite", sets: 1, reps: "30 sec", duration: 30, description: "Étirement oblique", restTime: 15, video: "https://www.youtube.com/watch?v=ezyMaQEaVaI" }
    ]
  },
  {
    id: 2,
    name: "Core & Stability Training",
    estimatedCalories: 250,
    warmup: [
      { name: "Rotations du tronc", sets: 1, reps: "30 sec", duration: 30, description: "Préparer les abdos", restTime: 15, video: "https://www.youtube.com/watch?v=PbqN516HvO8" },
      { name: "Genoux hauts sur place", sets: 1, reps: "30 sec", duration: 30, description: "Échauffement cardio", restTime: 15, video: "https://www.youtube.com/watch?v=D0GwAezTvtg" }
    ],
    workout: [
      { name: "Planche latérale droite", sets: 1, reps: "30 sec", duration: 30, description: "Gaine les obliques", restTime: 30, video: "https://www.youtube.com/watch?v=K2VljzCC16g" },
      { name: "Planche latérale gauche", sets: 1, reps: "30 sec", duration: 30, description: "Gaine les obliques", restTime: 30, video: "https://www.youtube.com/watch?v=K2VljzCC16g" },
      { name: "Crunch de type vélo", sets: 1, reps: "12", description: "Abdos contractés", restTime: 30, video: "https://www.youtube.com/watch?v=1we3bh9uhqY" },
      { name: "Torsion oblique allongée", sets: 1, reps: "14", description: "Rotation contrôlée", restTime: 30, video: "https://www.youtube.com/watch?v=mUqsWng_1Gc" },
      { name: "Planche dynamique", sets: 1, reps: "12", description: "Renforce le gainage", restTime: 30, video: "https://www.youtube.com/watch?v=QOCn3_iOAro" },
      { name: "Superman", sets: 1, reps: "15", description: "Renforce le bas du dos", restTime: 30, video: "https://www.youtube.com/watch?v=z6PJMT2y8GQ" },
      { name: "Pont fessier une jambe", sets: 1, reps: "10", description: "Active les fessiers", restTime: 30, video: "https://www.youtube.com/watch?v=3NXv0Nany-Q" },
      { name: "Relevé de jambes allongé", sets: 1, reps: "12", description: "Abdos inférieurs", restTime: 30, video: "https://www.youtube.com/watch?v=53KzU1lT7yI" },
      { name: "Crunch mains aux genoux", sets: 1, reps: "15", description: "Mouvement court et précis", restTime: 30, video: "https://www.youtube.com/watch?v=OM6JRkCQ4v8" },
      { name: "Gainage bras tendus", sets: 1, reps: "30 sec", duration: 30, description: "Stabilité des épaules", restTime: 30, video: "https://www.youtube.com/watch?v=6OVJ9em09ro" },
      { name: "Crunch avec rotation", sets: 1, reps: "12", description: "Engage les obliques", restTime: 30, video: "https://www.youtube.com/watch?v=1we3bh9uhqY" }
    ],
    cooldown: [
      { name: "Étirement chat/vache", sets: 1, reps: "60 sec", duration: 60, description: "Soulage la colonne", restTime: 15, video: "https://www.youtube.com/watch?v=KpNznspZZEY" },
      { name: "Étirement bras croisé devant", sets: 1, reps: "30 sec", duration: 30, description: "Épaules et dos", restTime: 15, video: "https://www.youtube.com/watch?v=ATusl0jg4SU" },
      { name: "Étirement en position de l’enfant", sets: 1, reps: "60 sec", duration: 60, description: "Relâchement total", restTime: 15, video: "https://www.youtube.com/watch?v=kH12QrSGedM" }
    ]
  },
  {
    id: 3,
    name: "HIIT Cardio + Core",
    estimatedCalories: 350,
    warmup: [
      { name: "Sauts sur place", sets: 1, reps: "30 sec", duration: 30, description: "Réchauffer le corps", restTime: 15, video: "https://www.youtube.com/watch?v=5X1tK41fJgM" },
      { name: "Rotation de bras", sets: 1, reps: "20 sec", duration: 20, description: "Préparer les épaules", restTime: 15, video: "https://www.youtube.com/watch?v=140RTNMciH8" }
    ],
    workout: [
      { name: "Burpees", sets: 1, reps: "10", description: "Exercice complet", restTime: 45, video: "https://www.youtube.com/watch?v=auBLPXO8Fww" },
      { name: "Mountain climbers", sets: 1, reps: "30 sec", duration: 30, description: "Cardio + core", restTime: 30, video: "https://www.youtube.com/watch?v=92V8s54o88Q" },
      { name: "Squat sauté", sets: 1, reps: "12", description: "Travail explosif", restTime: 30, video: "https://www.youtube.com/watch?v=A-cFYWvaHr0" },
      { name: "Planche latérale rotation gauche", sets: 1, reps: "8", description: "Engage les obliques", restTime: 30, video: "https://www.youtube.com/watch?v=V4A0wIh5HNk" },
      { name: "Planche latérale rotation droite", sets: 1, reps: "8", description: "Engage les obliques", restTime: 30, video: "https://www.youtube.com/watch?v=V4A0wIh5HNk" },
      { name: "Levée de jambes", sets: 1, reps: "15", description: "Abdos inférieurs", restTime: 30, video: "https://www.youtube.com/watch?v=53KzU1lT7yI" },
      { name: "Abdos en V", sets: 1, reps: "10", description: "Engagement complet", restTime: 30, video: "https://www.youtube.com/watch?v=7UVgs18Y1P4" },
      { name: "Pompes", sets: 1, reps: "15", description: "Pecs + triceps", restTime: 30, video: "https://www.youtube.com/watch?v=IODxDxX7oi4" },
      { name: "High knees", sets: 1, reps: "30 sec", duration: 30, description: "Cardio intense", restTime: 30, video: "https://www.youtube.com/watch?v=D0GwAezTvtg" },
      { name: "Crunchs rapides", sets: 1, reps: "20", description: "Abdos en rythme", restTime: 30, video: "https://www.youtube.com/watch?v=Xyd_fa5zoEU" },
      { name: "Planche sur coudes", sets: 1, reps: "45 sec", duration: 45, description: "Gaine statique", restTime: 30, video: "https://www.youtube.com/watch?v=6OVJ9em09ro" }
    ],
    cooldown: [
      { name: "Étirement ischio debout", sets: 1, reps: "30 sec", duration: 30, description: "Étirement postérieur", restTime: 15, video: "https://www.youtube.com/watch?v=Jku6PwFGBGk" },
      { name: "Étirement quadriceps", sets: 1, reps: "30 sec", duration: 30, description: "Étirement avant cuisse", restTime: 15, video: "https://www.youtube.com/watch?v=5wzThAMRdHk" },
      { name: "Respiration profonde allongée", sets: 1, reps: "60 sec", duration: 60, description: "Retour au calme", restTime: 0, video: "https://www.youtube.com/watch?v=6YB0pv3iv0g" }
    ]
  }
];



export default function FitnessApp() {
  // State
  const [currentView, setCurrentView] = useState<'dashboard' | 'workout' | 'calendar'>('dashboard');
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [workoutPhase, setWorkoutPhase] = useState<'warmup' | 'workout' | 'cooldown'>('warmup');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [completedSessions, setCompletedSessions] = useState<WorkoutSession[]>([]);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [previewDay, setPreviewDay] = useState<WorkoutDay | 'null' | null>(null);


  // Get current date info
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  

  // Calculate which workout day based on 3/1 cycle starting from tomorrow
  // Pattern: 3 ON, 1 OFF, 3 ON, 1 OFF...
  const getWorkoutDayId = (date: Date) => {
    // Calculate days since tomorrow (start of program)
    const daysSinceStart = Math.floor((date.getTime() - tomorrow.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceStart < 0) return null; // Before program start

    const cyclePosition = daysSinceStart % 4; // 4-day cycle

    // 0, 1, 2 = workout days (1, 2, 3), 3 = rest day
    if (cyclePosition === 3) return 0; // Rest day
    return cyclePosition + 1; // Workout days 1, 2, 3
  };

  const getCurrentWorkoutDay = () => {
    const workoutDayId = getWorkoutDayId(today);
    return workoutDayId === 0 || workoutDayId === null ? null : workoutProgram.find(day => day.id === workoutDayId);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (isResting) {
        setIsResting(false);
        nextExercise();
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, isResting]);

  // Session timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionStartTime) {
      interval = setInterval(() => {
        setTotalWorkoutTime(Math.floor((Date.now() - sessionStartTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  const startWorkout = (day: WorkoutDay) => {
    setSelectedDay(day);
    setCurrentView('workout');
    setWorkoutPhase('warmup');
    setCurrentExerciseIndex(0);
    setSessionStartTime(new Date());
    setTotalWorkoutTime(0);
  };

  const getCurrentExercise = () => {
    if (!selectedDay) return null;
    const exercises = selectedDay[workoutPhase];
    return exercises[currentExerciseIndex];
  };

  const startTimer = (duration: number) => {
    setTimer(duration);
    setIsTimerRunning(true);
  };

  const startRestTimer = () => {
    const exercise = getCurrentExercise();
    if (exercise && exercise.restTime > 0) {
      setIsResting(true);
      startTimer(exercise.restTime);
    } else {
      nextExercise();
    }
  };

  const nextExercise = () => {
    if (!selectedDay) return;

    const currentPhaseExercises = selectedDay[workoutPhase];

    if (currentExerciseIndex < currentPhaseExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Move to next phase
      if (workoutPhase === 'warmup') {
        setWorkoutPhase('workout');
        setCurrentExerciseIndex(0);
      } else if (workoutPhase === 'workout') {
        setWorkoutPhase('cooldown');
        setCurrentExerciseIndex(0);
      } else {
        // Workout completed
        completeWorkout();
      }
    }
  };

  const completeWorkout = () => {
    if (!selectedDay || !sessionStartTime) return;

    const session: WorkoutSession = {
      date: today.toISOString().split('T')[0],
      dayId: selectedDay.id,
      duration: totalWorkoutTime,
      calories: selectedDay.estimatedCalories,
      completed: true
    };

    setCompletedSessions([...completedSessions, session]);
    setCurrentView('dashboard');
    setSelectedDay(null);
    setSessionStartTime(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getWeeklyStats = () => {
    const thisWeek = completedSessions.filter(session => {
      const sessionDate = new Date(session.date);
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay() + 1);
      return sessionDate >= weekStart;
    });

    return {
      workouts: thisWeek.length,
      calories: thisWeek.reduce((sum, session) => sum + session.calories, 0),
      time: thisWeek.reduce((sum, session) => sum + session.duration, 0)
    };
  };

  const renderDashboard = () => {
    const todayWorkout = getCurrentWorkoutDay();
    const isRestDay = !todayWorkout;
    const stats = getWeeklyStats();

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Programme Fitness</h1>
          <p className="text-gray-600">Renforcement & Perte de poids • 3/1 Cycle</p>
        </div>

        {/* Today's workout */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {isRestDay ? "Jour de repos" : `Jour ${todayWorkout.id}: ${todayWorkout.name}`}
              </h2>
              <p className="opacity-90">
                {isRestDay
                  ? "Repos actif recommandé: marche ou étirements"
                  : `${todayWorkout.estimatedCalories} cal • ~60 min`
                }
              </p>
              {getWorkoutDayId(today) === null && (
                <p className="text-sm opacity-75 mt-1">Le programme commence demain!</p>
              )}
            </div>
            {!isRestDay && getWorkoutDayId(today) !== null && (
              <button
                onClick={() => startWorkout(todayWorkout)}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <Play size={20} />
                Commencer
              </button>
            )}
          </div>
        </div>

        {/* Weekly stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <Trophy className="text-yellow-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Séances</p>
                <p className="text-2xl font-bold text-gray-800">{stats.workouts}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <Flame className="text-orange-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Calories</p>
                <p className="text-2xl font-bold text-gray-800">{stats.calories}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <Clock className="text-blue-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Temps</p>
                <p className="text-2xl font-bold text-gray-800">{formatTime(stats.time)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* All workouts */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Programme complet</h3>
          <div className="space-y-3">
            {workoutProgram.map((day) => (
              <div key={day.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Jour {day.id}: {day.name}</h4>
                  <p className="text-sm text-gray-600">{day.estimatedCalories} calories • ~60 minutes</p>
                </div>
                <button
                  onClick={() => startWorkout(day)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Play size={16} />
                  Démarrer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

const renderWorkout = () => {
  if (!selectedDay) return null;

  const currentExercise = getCurrentExercise();
  if (!currentExercise) return null;

  const currentPhaseExercises = selectedDay[workoutPhase];
  const progress = ((currentExerciseIndex + 1) / currentPhaseExercises.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="text-blue-500 hover:text-blue-600"
        >
          ← Retour
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">{selectedDay.name}</h2>
          <p className="text-sm text-gray-600 capitalize">{workoutPhase}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Temps total</p>
          <p className="font-bold text-gray-800">{formatTime(totalWorkoutTime)}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Exercice {currentExerciseIndex + 1}/{currentPhaseExercises.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current exercise */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{currentExercise.name}</h3>
        <p className="text-lg mb-2">{currentExercise.sets} séries × {currentExercise.reps}</p>
        <p className="opacity-90">{currentExercise.description}</p>

        {/* Video embed */}
        {currentExercise.video && (
          <div className="mt-4 aspect-video rounded-lg overflow-hidden shadow-lg border border-white/10">
            <iframe
              className="w-full h-full"
              src={currentExercise.video.replace("watch?v=", "embed/")}
              title={currentExercise.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      {/* Timer */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
        {isResting && (
          <div className="mt-4">
            <button
              onClick={() => {
                setIsResting(false);
                setIsTimerRunning(false);
                setTimer(0);
                nextExercise();
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Passer le repos
            </button>
          </div>
        )}

        {isResting ? (
          <div>
            <p className="text-lg font-semibold text-orange-600 mb-2">Repos</p>
            <div className="text-4xl font-bold text-orange-600 mb-4">{formatTime(timer)}</div>
          </div>
        ) : currentExercise.duration ? (
          <div>
            <p className="text-lg font-semibold text-blue-600 mb-2">Durée</p>
            <div className="text-4xl font-bold text-blue-600 mb-4">{formatTime(timer)}</div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => startTimer(currentExercise.duration!)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                disabled={isTimerRunning}
              >
                <Play size={20} />
                Démarrer
              </button>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                disabled={timer === 0}
              >
                {isTimerRunning ? <Pause size={20} /> : <Play size={20} />}
                {isTimerRunning ? 'Pause' : 'Reprendre'}
              </button>
              <button
                onClick={() => {
                  setTimer(0);
                  setIsTimerRunning(false);
                }}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-lg font-semibold text-green-600 mb-4">Exercice libre</p>
            <p className="text-gray-600 mb-4">Effectuez {currentExercise.reps} répétitions</p>
          </div>
        )}

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={startRestTimer}
            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            Exercice terminé
          </button>
        </div>
      </div>
    </div>
  );
};


    const renderCalendar = () => {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const startOfWeek = new Date(startOfMonth);
      startOfWeek.setDate(startOfMonth.getDate() - startOfMonth.getDay() + 1);

      const days = [];
      const current = new Date(startOfWeek);

      while (current <= endOfMonth || days.length % 7 !== 0) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Calendrier d&quot;entraînement</h2>
            <p className="text-gray-600">Cycle 3 jours ON / 1 jour OFF</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 p-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((date, index) => {
                const isCurrentMonth = date.getMonth() === today.getMonth();
                const isToday = date.toDateString() === today.toDateString();
                const workoutDayId = getWorkoutDayId(date);
                const isRestDay = workoutDayId === 0;
                const hasSession = completedSessions.some(
                  session => session.date === date.toISOString().split('T')[0]
                );

                return (
                  // <div
                  //   key={index}
                  //   className={`
                  //     p-3 rounded-lg text-center relative
                  //     ${isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
                  //     ${isToday ? 'ring-2 ring-blue-500' : ''}
                  //     ${isRestDay ? 'bg-gray-100' : 'bg-blue-50'}
                  //     ${hasSession ? 'bg-green-100' : ''}
                  //   `}
                  // >
                  //   <div className="text-sm font-semibold">{date.getDate()}</div>
                  //   {isCurrentMonth && (
                  //     <div className="text-xs mt-1">
                  //       {isRestDay ? (
                  //         <span className="text-gray-500">Repos</span>
                  //       ) : (
                  //         <span className={`${hasSession ? 'text-green-600' : 'text-blue-600'}`}>
                  //           J{workoutDayId}
                  //         </span>
                  //       )}
                  //     </div>
                  //   )}
                  //   {hasSession && (
                  //     <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  //   )}
                  // </div>
                  <div
                    key={index}
                    onClick={() => {
                      const dayId = getWorkoutDayId(date);
                      const workoutDay = workoutProgram.find(d => d.id === dayId);
                      if (dayId === 0 || !workoutDay) {
                        setPreviewDay('null'); // jour de repos ou aucun entraînement trouvé
                      } else {
                        setPreviewDay(workoutDay);
                      }
                      
                    }}


                    className={`
                              cursor-pointer p-3 rounded-lg text-center relative
                              ${isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
                              ${isToday ? 'ring-2 ring-blue-500' : ''}
                              ${isRestDay ? 'bg-gray-100' : 'bg-blue-50'}
                              ${hasSession ? 'bg-green-100' : ''}
                              hover:ring-2 hover:ring-blue-400
                            `}
                  >
                    <div className="text-sm font-semibold">{date.getDate()}</div>
                    {isCurrentMonth && (
                      <div className="text-xs mt-1">
                        {isRestDay ? (
                          <span className="text-gray-500">Repos</span>
                        ) : (
                          <span className={`${hasSession ? 'text-green-600' : 'text-blue-600'}`}>
                            J{workoutDayId}
                          </span>
                        )}
                      </div>
                    )}
                    {hasSession && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>

                );
              })}
            </div>
            {previewDay !== null && (
              <div className="bg-white rounded-lg p-6 border border-gray-200 mt-6">
                {previewDay !== 'null' ? (
                  <>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Jour {previewDay.id} : {previewDay.name}
                    </h3>

                    {(['warmup', 'workout', 'cooldown'] as const).map((phase) => (
                      <div key={phase} className="mb-4">
                        <h4 className="text-md font-semibold text-blue-600 capitalize mb-2">
                          {phase === 'warmup' ? 'Échauffement' : phase === 'cooldown' ? 'Retour au calme' : 'Entraînement'}
                        </h4>
                        <ul className="space-y-2">
                          {previewDay[phase].map((ex, idx) => (
                            <li key={idx} className="flex items-start justify-between bg-gray-50 p-3 rounded-md border">
                              <div>
                                <p className="font-medium text-gray-800">{ex.name}</p>
                                <p className="text-sm text-gray-600">{ex.description}</p>
                              </div>
                              <div className="text-right text-sm text-gray-700">
                                {ex.duration ? `${Math.round(ex.duration / 60)} min` : `${ex.sets}×${ex.reps}`}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center text-gray-700 space-y-4">
                    <div className="text-5xl">☕</div>
                    <h3 className="text-xl font-bold">Jour de repos bien mérité</h3>
                    <p className="text-gray-600">Profite de ce moment pour te détendre, marcher un peu ou t&quot;étirer !</p>
                  </div>
                )}
              </div>
            )}


          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Légende</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-50 rounded border"></div>
                <span>Jour d&quot;entraînement</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span>Jour de repos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-100 rounded relative">
                  <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span>Séance complétée</span>
              </div>
            </div>
          </div>
        </div>
      );
    };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Navigation */}
        {currentView !== 'workout' && (
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-6 py-2 rounded-md transition-colors ${currentView === 'dashboard'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <Target size={18} className="inline mr-2" />
                Tableau de bord
              </button>
              <button
                onClick={() => setCurrentView('calendar')}
                className={`px-6 py-2 rounded-md transition-colors ${currentView === 'calendar'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                <Calendar size={18} className="inline mr-2" />
                Calendrier
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'workout' && renderWorkout()}
        {currentView === 'calendar' && renderCalendar()}
      </div>
    </div>
  );
}