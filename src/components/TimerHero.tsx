import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Layers,
  FastForward
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WorkoutRoutine, Exercise, ActiveWorkoutState, AppSettings, DifficultyLevel } from '../types';
import { EXERCISES_LIBRARY } from '../data/exercises';
import { soundEngine } from '../services/audio';
import { ExerciseVisual } from './ExerciseVisual';
import { FITNESS_LEVEL_CONFIGS, getExerciseTargetSets } from '../data/progression';

interface TimerHeroProps {
  routine: WorkoutRoutine;
  settings: AppSettings;
  userLevel?: DifficultyLevel;
  onUpdateUserLevel?: (level: DifficultyLevel) => void;
  onFinishWorkout: (durationMinutes: number, exercisesCompleted: number, notes?: string, rating?: number) => void;
  onExitWorkout: () => void;
  onOpenSafetyModal: () => void;
  onOpenExerciseDetails: (exercise: Exercise) => void;
  activeWorkoutState: ActiveWorkoutState | null;
  onUpdateActiveState: (state: ActiveWorkoutState | null) => void;
}

export const TimerHero: React.FC<TimerHeroProps> = ({
  routine,
  settings,
  userLevel = 'beginner',
  onUpdateUserLevel,
  onFinishWorkout,
  onExitWorkout,
  onOpenSafetyModal,
  onOpenExerciseDetails,
  activeWorkoutState,
  onUpdateActiveState
}) => {
  const exercises = routine.exercises;
  const totalExercises = exercises.length;

  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(
    activeWorkoutState?.selectedLevel || userLevel || 'beginner'
  );
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(
    activeWorkoutState ? activeWorkoutState.currentExerciseIndex : 0
  );
  const [currentSet, setCurrentSet] = useState<number>(
    activeWorkoutState?.currentSet || 1
  );
  const [isSetRest, setIsSetRest] = useState<boolean>(false);
  const [phase, setPhase] = useState<'prep' | 'work' | 'rest' | 'completed'>(
    activeWorkoutState ? activeWorkoutState.currentPhase : 'prep'
  );
  const [timeRemaining, setTimeRemaining] = useState<number>(
    activeWorkoutState
      ? activeWorkoutState.timeRemainingSeconds
      : settings.prepCountdownSeconds
  );
  const [totalPhaseDuration, setTotalPhaseDuration] = useState<number>(
    activeWorkoutState ? activeWorkoutState.totalDurationSeconds : settings.prepCountdownSeconds
  );
  const [isRunning, setIsRunning] = useState<boolean>(
    activeWorkoutState ? activeWorkoutState.isRunning : true
  );
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(
    activeWorkoutState ? activeWorkoutState.elapsedSeconds : 0
  );

  const [soundOn, setSoundOn] = useState<boolean>(settings.soundEnabled);
  const [voiceOn, setVoiceOn] = useState<boolean>(settings.voiceCuesEnabled);
  const [showFormCues, setShowFormCues] = useState<boolean>(true);
  const [showAnimation, setShowAnimation] = useState<boolean>(true);
  const [bengaliMode, setBengaliMode] = useState<boolean>(true);
  const [showLevelDropdown, setShowLevelDropdown] = useState<boolean>(false);

  const [reflectionRating, setReflectionRating] = useState<number>(5);
  const [reflectionNotes, setReflectionNotes] = useState<string>('');

  const currentRoutineExercise = exercises[currentExerciseIndex] || exercises[0];
  const currentExercise = EXERCISES_LIBRARY.find(e => e.id === currentRoutineExercise.exerciseId);
  const nextRoutineExercise = exercises[currentExerciseIndex + 1];
  const nextExercise = nextRoutineExercise
    ? EXERCISES_LIBRARY.find(e => e.id === nextRoutineExercise.exerciseId)
    : null;

  const isFirstExercise = currentExerciseIndex === 0;
  const isLastExercise = currentExerciseIndex === totalExercises - 1;
  const currentTargetSets = getExerciseTargetSets(
    currentRoutineExercise.exerciseId,
    selectedLevel,
    isFirstExercise,
    isLastExercise
  );
  const levelConfig = FITNESS_LEVEL_CONFIGS[selectedLevel] || FITNESS_LEVEL_CONFIGS.beginner;

  useEffect(() => {
    soundEngine.setMuted(!soundOn);
  }, [soundOn]);

  useEffect(() => {
    soundEngine.setVoiceEnabled(voiceOn);
  }, [voiceOn]);

  useEffect(() => {
    if (phase === 'prep') {
      soundEngine.speakVoiceCue(`Get ready for ${currentExercise?.name || 'workout'}`);
    } else if (phase === 'work') {
      soundEngine.playStartWorkChime();
      if (currentTargetSets > 1) {
        soundEngine.speakVoiceCue(`Set ${currentSet} of ${currentTargetSets}. Begin ${currentExercise?.name || 'exercise'}`);
      } else {
        soundEngine.speakVoiceCue(`Begin ${currentExercise?.name || 'exercise'}`);
      }
    }
  }, [phase, currentExerciseIndex, currentSet]);

  useEffect(() => {
    if (phase === 'completed') {
      onUpdateActiveState(null);
    } else {
      onUpdateActiveState({
        routineId: routine.id,
        routineTitle: routine.title,
        currentExerciseIndex,
        currentSet,
        totalSets: currentTargetSets,
        selectedLevel,
        currentPhase: phase,
        timeRemainingSeconds: timeRemaining,
        totalDurationSeconds: totalPhaseDuration,
        elapsedSeconds,
        isRunning,
        totalExercises
      });
    }
  }, [currentExerciseIndex, currentSet, currentTargetSets, selectedLevel, phase, timeRemaining, isRunning, elapsedSeconds]);

  const handlePhaseTransition = () => {
    if (phase === 'prep') {
      const workSecs = currentRoutineExercise.workSeconds || 45;
      setPhase('work');
      setTimeRemaining(workSecs);
      setTotalPhaseDuration(workSecs);
      setIsSetRest(false);
    } else if (phase === 'work') {
      // Check if more sets remain for this exercise
      if (currentSet < currentTargetSets) {
        // Inter-set rest for the same exercise
        const restSecs = levelConfig.restBetweenSetsSeconds;
        setPhase('rest');
        setIsSetRest(true);
        setTimeRemaining(restSecs);
        setTotalPhaseDuration(restSecs);
        soundEngine.playRestChime();
        soundEngine.speakVoiceCue(`Set ${currentSet} complete! Rest ${restSecs} seconds before Set ${currentSet + 1}.`);
      } else {
        // All sets for this exercise finished!
        if (isLastExercise) {
          setPhase('completed');
          setIsRunning(false);
          soundEngine.playCompleteFanfare();
          soundEngine.speakVoiceCue('Workout complete! Excellent consistency.');
          triggerConfetti();
        } else {
          // Inter-exercise transition rest
          const restSecs = levelConfig.restBetweenExercisesSeconds || currentRoutineExercise.restSeconds || 20;
          setPhase('rest');
          setIsSetRest(false);
          setTimeRemaining(restSecs);
          setTotalPhaseDuration(restSecs);
          soundEngine.playRestChime();
          soundEngine.speakVoiceCue(`Exercise complete! Take a breather. Next is ${nextExercise ? nextExercise.name : 'coming up'}.`);
        }
      }
    } else if (phase === 'rest') {
      if (isSetRest) {
        // Proceed to next set of same exercise
        const nextSet = currentSet + 1;
        setCurrentSet(nextSet);
        setIsSetRest(false);
        setPhase('work');
        setTimeRemaining(currentRoutineExercise.workSeconds);
        setTotalPhaseDuration(currentRoutineExercise.workSeconds);
      } else {
        // Proceed to next exercise (Set 1)
        const nextIdx = currentExerciseIndex + 1;
        if (nextIdx >= totalExercises) {
          setPhase('completed');
          setIsRunning(false);
          soundEngine.playCompleteFanfare();
          triggerConfetti();
        } else {
          const nextEx = exercises[nextIdx];
          setCurrentExerciseIndex(nextIdx);
          setCurrentSet(1);
          setIsSetRest(false);
          setPhase('work');
          setTimeRemaining(nextEx.workSeconds);
          setTotalPhaseDuration(nextEx.workSeconds);
        }
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && phase !== 'completed') {
      timer = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);

        setTimeRemaining(prev => {
          if (prev <= 4 && prev > 1) {
            soundEngine.playCountdownTick(prev - 1);
          }

          if (prev <= 1) {
            handlePhaseTransition();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, phase, currentExerciseIndex, currentSet, currentTargetSets, currentRoutineExercise, isSetRest]);

  const handleTogglePlay = () => {
    setIsRunning(!isRunning);
    soundEngine.playTick(500, 0.05);
  };

  const handleSkipNext = () => {
    soundEngine.playTick(650, 0.06);
    const nextIdx = currentExerciseIndex + 1;
    if (nextIdx >= totalExercises) {
      setPhase('completed');
      setIsRunning(false);
      soundEngine.playCompleteFanfare();
      triggerConfetti();
    } else {
      const nextEx = exercises[nextIdx];
      setCurrentExerciseIndex(nextIdx);
      setCurrentSet(1);
      setIsSetRest(false);
      setPhase('work');
      setTimeRemaining(nextEx.workSeconds);
      setTotalPhaseDuration(nextEx.workSeconds);
    }
  };

  const handleSkipRest = () => {
    soundEngine.playTick(600, 0.05);
    handlePhaseTransition();
  };

  const handleSkipPrev = () => {
    soundEngine.playTick(420, 0.06);
    if (currentSet > 1 && phase === 'work') {
      // Go back to set 1 of this exercise
      setCurrentSet(1);
      setTimeRemaining(currentRoutineExercise.workSeconds);
      setTotalPhaseDuration(currentRoutineExercise.workSeconds);
    } else if (currentExerciseIndex > 0) {
      const prevIdx = currentExerciseIndex - 1;
      const prevEx = exercises[prevIdx];
      setCurrentExerciseIndex(prevIdx);
      setCurrentSet(1);
      setIsSetRest(false);
      setPhase('work');
      setTimeRemaining(prevEx.workSeconds);
      setTotalPhaseDuration(prevEx.workSeconds);
    } else {
      const workSecs = currentRoutineExercise.workSeconds;
      setCurrentSet(1);
      setPhase('work');
      setTimeRemaining(workSecs);
      setTotalPhaseDuration(workSecs);
    }
  };

  const handleResetPhase = () => {
    soundEngine.playTick(400, 0.08);
    const workSecs = currentRoutineExercise.workSeconds;
    setPhase('work');
    setTimeRemaining(workSecs);
    setTotalPhaseDuration(workSecs);
    setIsRunning(false);
  };

  const handleLevelChange = (lvl: DifficultyLevel) => {
    setSelectedLevel(lvl);
    setShowLevelDropdown(false);
    if (onUpdateUserLevel) {
      onUpdateUserLevel(lvl);
    }
    const newTarget = getExerciseTargetSets(
      currentRoutineExercise.exerciseId,
      lvl,
      isFirstExercise,
      isLastExercise
    );
    if (currentSet > newTarget) {
      setCurrentSet(newTarget);
    }
    soundEngine.playTick(550, 0.05);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSkipNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleSkipPrev();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleResetPhase();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setSoundOn(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, currentExerciseIndex, currentSet, phase]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const formatClock = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = totalPhaseDuration > 0
    ? circumference - (timeRemaining / totalPhaseDuration) * circumference
    : 0;

  const durationMinutes = Math.max(1, Math.round(elapsedSeconds / 60));

  if (phase === 'completed') {
    return (
      <div className="max-w-xl mx-auto py-10 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500 font-comic">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border-2 border-emerald-400 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 size={44} />
        </div>

        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Session Completed • {levelConfig.name} ({levelConfig.sets} Sets)
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Excellent work! You showed up today.
          </h2>
          <p className="text-sm text-blue-200/80 mt-2">
            Every controlled set builds posture resilience, healthy joints, and full-body vitality.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 p-5 ios-glass-card rounded-3xl text-left shadow-lg">
          <div>
            <span className="text-[11px] text-blue-300/70 uppercase tracking-wider block font-bold">Duration</span>
            <span className="text-xl font-extrabold text-white">{durationMinutes} min</span>
          </div>
          <div>
            <span className="text-[11px] text-blue-300/70 uppercase tracking-wider block font-bold">Exercises</span>
            <span className="text-xl font-extrabold text-white">{totalExercises}</span>
          </div>
          <div>
            <span className="text-[11px] text-blue-300/70 uppercase tracking-wider block font-bold">Intensity</span>
            <span className="text-xl font-extrabold text-emerald-400">{levelConfig.name}</span>
          </div>
        </div>

        <div className="p-5 ios-glass-card rounded-3xl text-left space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-200/80 uppercase tracking-wider">
              How did this session feel?
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setReflectionRating(star)}
                  className={`text-base ${
                    star <= reflectionRating ? 'text-amber-400' : 'text-blue-900/60'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Optional reflection notes (e.g., '2 sets felt comfortable and refreshing', 'Hamstrings relaxed')..."
            value={reflectionNotes}
            onChange={e => setReflectionNotes(e.target.value)}
            rows={2}
            className="w-full bg-blue-950/60 border border-blue-400/20 rounded-2xl p-3 text-xs text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400"
          />
        </div>

        <button
          onClick={() => onFinishWorkout(durationMinutes, totalExercises, reflectionNotes, reflectionRating)}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-105 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98"
        >
          <span>Save &amp; Return to Overview</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div id="active-timer-hero" className="max-w-4xl mx-auto flex flex-col items-center justify-between pb-8 font-comic">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between px-2 pt-1 pb-4 border-b border-blue-400/15">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-300/70">
            {routine.title}
          </div>
          <div className="text-sm font-semibold text-blue-100 flex items-center gap-2">
            <span>Exercise {currentExerciseIndex + 1} of {totalExercises}</span>
            {currentTargetSets > 1 && (
              <span className="text-[11px] px-2 py-0.5 rounded-lg bg-blue-900/60 border border-blue-400/25 text-blue-200 font-mono">
                Set {currentSet}/{currentTargetSets}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Level Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowLevelDropdown(!showLevelDropdown)}
              className="px-2.5 py-1.5 rounded-xl bg-blue-950/70 hover:bg-blue-900/80 border border-blue-400/25 text-xs text-blue-200 flex items-center gap-1.5 transition-colors font-medium"
              title="Change Training Level & Sets"
            >
              <Layers size={13} className="text-blue-400" />
              <span className="font-bold">{levelConfig.name}</span>
              <span className="text-[10px] text-blue-300/80">({levelConfig.sets}S)</span>
              <ChevronDown size={12} className="text-blue-400" />
            </button>

            {showLevelDropdown && (
              <div className="absolute right-0 mt-2 w-64 p-2 rounded-2xl bg-[#0e1726] border border-blue-400/30 shadow-2xl z-30 space-y-1 text-left">
                <div className="px-2 py-1 text-[11px] text-blue-300/70 uppercase font-bold border-b border-blue-400/15">
                  Training Level &amp; Sets
                </div>
                {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map(lvl => {
                  const cfg = FITNESS_LEVEL_CONFIGS[lvl];
                  const isSelected = selectedLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => handleLevelChange(lvl)}
                      className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start gap-2 ${
                        isSelected 
                          ? 'bg-blue-600 text-white font-bold' 
                          : 'hover:bg-blue-950/80 text-blue-100'
                      }`}
                    >
                      <div className="mt-0.5">
                        {lvl === 'beginner' && '🟢'}
                        {lvl === 'intermediate' && '🔵'}
                        {lvl === 'advanced' && '🔥'}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold flex items-center justify-between">
                          <span>{cfg.name}</span>
                          <span className="text-[10px] opacity-80">{cfg.sets} Sets</span>
                        </div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-blue-300/70'}`}>
                          {cfg.bengaliSubtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => setSoundOn(!soundOn)}
            className={`p-2 rounded-xl border text-xs transition-colors ${
              soundOn
                ? 'bg-blue-600/40 border-blue-400/40 text-white'
                : 'bg-blue-950/60 border-blue-400/15 text-blue-300/60'
            }`}
            title={soundOn ? 'Sound On' : 'Sound Muted'}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => setVoiceOn(!voiceOn)}
            className={`p-2 rounded-xl border text-xs transition-colors ${
              voiceOn
                ? 'bg-blue-600/40 border-blue-400/40 text-white'
                : 'bg-blue-950/60 border-blue-400/15 text-blue-300/60'
            }`}
            title={voiceOn ? 'Voice cues active' : 'Voice cues disabled'}
          >
            {voiceOn ? <Mic size={16} /> : <MicOff size={16} />}
          </button>

          <button
            onClick={onOpenSafetyModal}
            className="px-3 py-1.5 rounded-xl bg-amber-950/30 hover:bg-amber-900/40 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <ShieldAlert size={14} />
            <span className="hidden sm:inline">Feeling unwell?</span>
          </button>

          <button
            onClick={onExitWorkout}
            className="px-3 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-400/20 text-xs text-blue-200 hover:text-white transition-colors"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Hero Visual Stage */}
      <div className="w-full flex flex-col items-center justify-center py-5">
        {/* Phase Badges & Set Tracker */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          {phase === 'prep' && (
            <span className="px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-950/60 text-blue-300 border border-blue-400/30 animate-pulse">
              PREPARATION • GET READY
            </span>
          )}
          {phase === 'work' && (
            <span className="px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
              WORK • CONTROLLED TEMPO
            </span>
          )}
          {phase === 'rest' && (
            <span className="px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-900/40 text-blue-200 border border-blue-400/30">
              {isSetRest ? 'SET REST • RECOVER' : 'TRANSITION REST • NEXT EXERCISE'}
            </span>
          )}

          {/* Set Tracker Indicator */}
          {currentTargetSets > 1 ? (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-400/25 text-xs font-bold text-blue-200">
              <span className="text-blue-400">SET {currentSet} OF {currentTargetSets}</span>
              <div className="flex items-center gap-1 ml-1">
                {Array.from({ length: currentTargetSets }).map((_, idx) => {
                  const setNum = idx + 1;
                  const isDone = setNum < currentSet || (setNum === currentSet && phase === 'rest' && isSetRest);
                  const isCurrent = setNum === currentSet && phase === 'work';
                  return (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        isDone 
                          ? 'bg-emerald-400' 
                          : isCurrent 
                          ? 'bg-blue-400 ring-2 ring-blue-300/50 scale-125' 
                          : 'bg-blue-900/80'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <span className="px-3 py-1 rounded-full bg-blue-950/60 border border-blue-400/20 text-[11px] text-blue-300/80">
              {isFirstExercise ? 'Warm-up (1 Set)' : 'Cooldown (1 Set)'}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center max-w-xl">
            {phase === 'rest'
              ? (isSetRest ? `Take a Breather (Rest between sets)` : `Exercise Complete! Take a Breather`)
              : (bengaliMode && currentExercise?.bengaliName ? currentExercise.bengaliName : currentExercise?.name)}
          </h2>
        </div>

        {/* Subtitle / Next Exercise or Next Set Hint */}
        <p className="text-xs sm:text-sm text-blue-200/80 mt-1 text-center max-w-lg">
          {phase === 'rest' ? (
            isSetRest ? (
              <span className="text-emerald-300 font-bold">
                Next: Set {currentSet + 1} of {currentTargetSets} of {bengaliMode && currentExercise?.bengaliName ? currentExercise.bengaliName : currentExercise?.name}
              </span>
            ) : (
              <span className="text-blue-300 font-bold">
                Up next: {nextExercise ? (bengaliMode && nextExercise.bengaliName ? `${nextExercise.name} (${nextExercise.bengaliName})` : nextExercise.name) : 'Session completion'}
              </span>
            )
          ) : (
            currentRoutineExercise.reps 
              ? `${currentRoutineExercise.reps} • ${currentExercise?.purpose || ''}`
              : currentExercise?.purpose
          )}
        </p>

        {/* Toggle animation demo button */}
        {currentExercise && phase !== 'rest' && (
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setShowAnimation(!showAnimation)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-950/70 hover:bg-blue-900/70 border border-blue-400/25 text-xs text-blue-200 flex items-center gap-1.5 transition-all active:scale-95 shadow-sm font-comic"
            >
              <Info size={13} className="text-blue-400" />
              <span>{showAnimation ? 'Hide Animation' : 'Show Animation Guide'}</span>
            </button>
          </div>
        )}

        {/* Animated Exercise Visual Stage */}
        {currentExercise && phase !== 'rest' && showAnimation && (
          <div className="w-full max-w-md my-3 px-2 animate-in fade-in duration-300">
            <ExerciseVisual
              exercise={currentExercise}
              size="md"
              showControls={true}
              className="w-full border-blue-400/30"
            />
          </div>
        )}

        {/* Circular Progress & Big Timer Display */}
        <div className="relative my-4 flex items-center justify-center">
          <svg className="w-72 h-72 -rotate-90 transform" viewBox="0 0 280 280">
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="#0f2248"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke={
                phase === 'rest'
                  ? '#818cf8'
                  : phase === 'prep'
                  ? '#38bdf8'
                  : '#34d399'
              }
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500 ease-linear"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-6xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_24px_rgba(56,189,248,0.3)]">
              {formatClock(timeRemaining)}
            </span>
            <span className="text-[11px] font-bold text-blue-300 uppercase tracking-widest mt-1">
              {isRunning ? (
                phase === 'work' 
                  ? (currentTargetSets > 1 ? `Set ${currentSet} of ${currentTargetSets}` : 'Active Work') 
                  : (isSetRest ? 'Set Rest' : 'Resting')
              ) : 'PAUSED'}
            </span>

            {/* Quick Skip Rest button if in rest */}
            {phase === 'rest' && (
              <button
                onClick={handleSkipRest}
                className="mt-2 px-3 py-1 rounded-xl bg-blue-600/60 hover:bg-blue-600 border border-blue-400/40 text-[11px] font-bold text-white flex items-center gap-1 transition-all active:scale-95 shadow-sm"
              >
                <span>{isSetRest ? `Start Set ${currentSet + 1} Now` : 'Start Next Exercise'}</span>
                <FastForward size={11} />
              </button>
            )}
          </div>
        </div>

        {/* Linear Progress Bar for overall workout */}
        <div className="w-full max-w-md px-4 mb-3">
          <div className="flex items-center justify-between text-[11px] text-blue-300/70 mb-1">
            <span>Overall Session</span>
            <span>
              {Math.round(((currentExerciseIndex + (currentSet / currentTargetSets)) / totalExercises) * 100)}%
            </span>
          </div>
          <div className="w-full bg-blue-950/80 rounded-full h-2 overflow-hidden border border-blue-400/20">
            <div
              className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, Math.round(((currentExerciseIndex + (currentSet / currentTargetSets)) / totalExercises) * 100))}%`
              }}
            />
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-3 sm:gap-4 my-2">
          <button
            onClick={handleSkipPrev}
            disabled={currentExerciseIndex === 0 && currentSet === 1 && phase === 'prep'}
            className="w-12 h-12 rounded-2xl bg-blue-950/70 hover:bg-blue-900/70 border border-blue-400/20 disabled:opacity-40 text-blue-200 flex items-center justify-center transition-all active:scale-95 shadow-md"
            title="Previous Exercise / Restart Set (Left Arrow)"
          >
            <SkipBack size={18} />
          </button>

          <button
            onClick={handleTogglePlay}
            className={`w-20 h-16 rounded-2xl flex items-center justify-center font-bold text-sm transition-all shadow-xl active:scale-95 ${
              isRunning
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                : 'bg-emerald-400 hover:bg-emerald-300 text-blue-950 ring-4 ring-emerald-500/30 shadow-emerald-500/20'
            }`}
            title="Pause / Resume (Spacebar)"
          >
            {isRunning ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button
            onClick={handleSkipNext}
            className="w-12 h-12 rounded-2xl bg-blue-950/70 hover:bg-blue-900/70 border border-blue-400/20 text-blue-200 flex items-center justify-center transition-all active:scale-95 shadow-md"
            title="Next Exercise (Right Arrow)"
          >
            <SkipForward size={18} />
          </button>

          <button
            onClick={handleResetPhase}
            className="w-10 h-10 rounded-xl bg-blue-950/50 hover:bg-blue-900/60 border border-blue-400/20 text-blue-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
            title="Reset timer (R)"
          >
            <RotateCcw size={15} />
          </button>
        </div>

        <div className="text-[11px] text-blue-300/60 mt-1">
          Space: {isRunning ? 'Pause' : 'Resume'} • Right: Next Exercise • M: Mute
        </div>
      </div>

      {/* Bottom Accordion: Form Cues & Biomechanics */}
      {currentExercise && phase !== 'rest' && (
        <div className="w-full max-w-2xl ios-glass-card rounded-3xl overflow-hidden transition-all mt-2 shadow-lg">
          <div className="p-4 flex items-center justify-between hover:bg-blue-900/30 transition-colors">
            <button
              onClick={() => setShowFormCues(!showFormCues)}
              className="flex items-center gap-2 text-left flex-1"
            >
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {bengaliMode ? 'ব্যায়ামের সঠিক নিয়ম ও টেকনিক' : 'Biomechanics & Form Cues'}
              </span>
              <span className="text-[11px] text-blue-300/70 hidden sm:inline">• {currentExercise.targetMuscles.join(', ')}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setBengaliMode(!bengaliMode)}
                className="px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-400/30 text-[10px] font-bold text-blue-200"
              >
                {bengaliMode ? 'English' : 'বাংলা'}
              </button>
              <button
                onClick={() => setShowFormCues(!showFormCues)}
                className="p-1 text-blue-200/80"
              >
                {showFormCues ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>

          {showFormCues && (
            <div className="px-4 pb-4 pt-1 border-t border-blue-400/15 space-y-3 text-xs">
              {/* Step by step how to */}
              {bengaliMode && currentExercise.bengaliHowTo && currentExercise.bengaliHowTo.length > 0 && (
                <div className="space-y-1 bg-blue-950/40 p-3 rounded-2xl border border-blue-400/15">
                  <span className="text-[11px] font-bold text-blue-300 block mb-1">কীভাবে করবেন (ধাপে ধাপে):</span>
                  {currentExercise.bengaliHowTo.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-blue-100/90 leading-relaxed">
                      <span className="text-blue-400 font-bold shrink-0">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Form cues */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-blue-300 block">
                  {bengaliMode ? 'সঠিক ফর্ম ও সতর্কবার্তা:' : 'Key Form Cues:'}
                </span>
                {(bengaliMode && currentExercise.bengaliFormCues
                  ? currentExercise.bengaliFormCues
                  : currentExercise.formCues
                ).map((cue, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-blue-100/90 leading-relaxed">
                    <span className="text-blue-300 font-bold">•</span>
                    <span>{cue}</span>
                  </div>
                ))}
              </div>

              {/* Breathing & Variations */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-400/15 text-[11px] flex-1">
                  <span className="font-bold text-blue-300">{bengaliMode ? 'সহজ বিকল্প: ' : 'Easier Option: '}</span>
                  <span className="text-blue-200/80">
                    {bengaliMode && currentExercise.bengaliVariation
                      ? currentExercise.bengaliVariation
                      : currentExercise.easierVariation}
                  </span>
                </div>
                <button
                  onClick={() => onOpenExerciseDetails(currentExercise)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center justify-center gap-1.5 border border-blue-400/30 transition-all shadow-md active:scale-95 shrink-0 font-comic"
                >
                  <Info size={13} />
                  <span>Full Exercise Guide</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
