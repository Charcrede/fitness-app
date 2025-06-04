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
const workoutProgram: WorkoutDay[] = [
  {
    id: 1,
    name: "Haut du corps",
    estimatedCalories: 280,
    warmup: [
      { name: "Jumping jacks", sets: 1, reps: "2 min", duration: 120, description: "Pour monter le cardio", restTime: 0 },
      { name: "Rotations des bras", sets: 2, reps: "30 sec", duration: 30, description: "Dans chaque sens", restTime: 10 },
      { name: "Montées de genoux", sets: 1, reps: "2 min", duration: 120, description: "Sur place", restTime: 0 },
      { name: "Planche dynamique", sets: 1, reps: "1 min", duration: 60, description: "Alterne planche coudes/mains", restTime: 0 }
    ],
    workout: [
      { name: "Pompes classiques", sets: 3, reps: "10-15", description: "Corps droit, poitrine au sol", restTime: 60 },
      { name: "Pompes diamant", sets: 3, reps: "8-12", description: "Mains en triangle", restTime: 60 },
      { name: "Dips sur chaise", sets: 3, reps: "10-15", description: "Descends le bassin vers le sol", restTime: 60 },
      { name: "Planche latérale", sets: 3, reps: "20-30 sec", duration: 30, description: "Corps droit, chaque côté", restTime: 45 },
      { name: "Mountain climbers", sets: 3, reps: "30-45 sec", duration: 45, description: "Genoux vers poitrine, rapide", restTime: 60 },
      { name: "Relevés de buste", sets: 3, reps: "15-20", description: "Buste vers genoux", restTime: 60 }
    ],
    cooldown: [
      { name: "Étirement pecs", sets: 2, reps: "30 sec", duration: 30, description: "Bras en L dans porte", restTime: 10 },
      { name: "Étirement tronc", sets: 2, reps: "30 sec", duration: 30, description: "Rotation assise", restTime: 10 },
      { name: "Respiration profonde", sets: 1, reps: "1-2 min", duration: 90, description: "4 sec inspire, 6 sec expire", restTime: 0 }
    ]
  },
  {
    id: 2,
    name: "Bas du corps et cardio",
    estimatedCalories: 320,
    warmup: [
      { name: "Squats lents", sets: 1, reps: "2 min", duration: 120, description: "Sans poids", restTime: 0 },
      { name: "Fentes marchées", sets: 1, reps: "1 min", duration: 60, description: "Alternées", restTime: 0 },
      { name: "Cercles de hanches", sets: 2, reps: "30 sec", duration: 30, description: "Chaque sens", restTime: 10 },
      { name: "Sauts sur place", sets: 1, reps: "2 min", duration: 120, description: "Échauffement cardio", restTime: 0 }
    ],
    workout: [
      { name: "Squats au poids du corps", sets: 3, reps: "15-20", description: "Cuisses parallèles", restTime: 60 },
      { name: "Fentes avant", sets: 3, reps: "10-12/jambe", description: "Genou arrière vers sol", restTime: 60 },
      { name: "Pont fessier", sets: 3, reps: "15-20", description: "Soulève bassin, serre fessiers", restTime: 45 },
      { name: "Squat sauté", sets: 3, reps: "10-15", description: "Squat puis saut explosif", restTime: 75 },
      { name: "Planche levée jambe", sets: 3, reps: "10-12/jambe", description: "Jambe tendue, 1 sec", restTime: 60 },
      { name: "Burpees", sets: 3, reps: "8-12", description: "Squat-planche-squat-saut", restTime: 90 }
    ],
    cooldown: [
      { name: "Étirement quadriceps", sets: 2, reps: "30 sec", duration: 30, description: "Pied vers fessiers", restTime: 10 },
      { name: "Étirement fessiers", sets: 2, reps: "30 sec", duration: 30, description: "Genou vers poitrine", restTime: 10 },
      { name: "Respiration profonde", sets: 1, reps: "1-2 min", duration: 90, description: "Récupération", restTime: 0 }
    ]
  },
  {
    id: 3,
    name: "Full body et core",
    estimatedCalories: 300,
    warmup: [
      { name: "Jumping jacks", sets: 1, reps: "2 min", duration: 120, description: "Cardio activation", restTime: 0 },
      { name: "Rotations du buste", sets: 1, reps: "1 min", duration: 60, description: "Mobilité tronc", restTime: 0 },
      { name: "Genoux hauts", sets: 1, reps: "2 min", duration: 120, description: "Sur place", restTime: 0 },
      { name: "Planche", sets: 1, reps: "30-60 sec", duration: 45, description: "Position statique", restTime: 0 }
    ],
    workout: [
      { name: "Pompes inclinées", sets: 3, reps: "10-15", description: "Mains surélevées", restTime: 60 },
      { name: "Squat avec rotation", sets: 3, reps: "10-12/côté", description: "Tourne buste en remontant", restTime: 60 },
      { name: "Planche touche épaule", sets: 3, reps: "20 touches", description: "Corps stable, alterne", restTime: 60 },
      { name: "Bicycle crunches", sets: 3, reps: "15-20/côté", description: "Coude-genou opposés", restTime: 45 },
      { name: "Burpees", sets: 3, reps: "8-12", description: "Intensité maximale", restTime: 90 },
      { name: "Russian twists", sets: 3, reps: "20-30", description: "Buste penché, tourne", restTime: 60 }
    ],
    cooldown: [
      { name: "Position enfant", sets: 1, reps: "30 sec", duration: 30, description: "Étirement dos", restTime: 0 },
      { name: "Étirement abdos", sets: 1, reps: "30 sec", duration: 30, description: "Arque le dos", restTime: 0 },
      { name: "Respiration profonde", sets: 1, reps: "1-2 min", duration: 90, description: "Relaxation", restTime: 0 }
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