export type WorkoutCategory = 'full_body' | 'mobility' | 'core' | 'cardio' | 'recovery' | 'upper_body' | 'lower_body';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type EquipmentType = 'none' | 'dumbbells' | 'bands' | 'mat' | 'chair';
export type WorkoutTimeOfDay = 'morning' | 'evening' | 'any';

export interface Exercise {
  id: string;
  name: string;
  bengaliName?: string;
  category: WorkoutCategory;
  difficulty: DifficultyLevel;
  durationSeconds?: number;
  reps?: string;
  sets?: number;
  restSeconds: number;
  purpose: string;
  bengaliPurpose?: string;
  bengaliHowTo?: string[];
  formCues: string[];
  bengaliFormCues?: string[];
  bengaliMistakes?: string[];
  bengaliBreathing?: string;
  easierVariation: string;
  bengaliVariation?: string;
  stopSafetyNote: string;
  bengaliSafetyNote?: string;
  equipment: EquipmentType[];
  targetMuscles: string[];
  animationType?: 'squat' | 'pushup' | 'knee_pushup' | 'wall_pushup' | 'plank' | 'glute_bridge' | 'cat_cow' | 'bird_dog' | 'dead_bug' | 'marching' | 'childs_pose' | 'cobra' | 'jumping_jack' | 'superman' | 'stretch';
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  subtitle: string;
  bengaliTitle?: string;
  category: WorkoutCategory;
  difficulty: DifficultyLevel;
  timeOfDay?: WorkoutTimeOfDay;
  isPunishment?: boolean;
  estimatedMinutes: number;
  exercises: {
    exerciseId: string;
    workSeconds: number;
    restSeconds: number;
    reps?: string;
  }[];
  description: string;
  recommendedDays?: string[];
}

export interface WorkoutAlarm {
  id: 'morning' | 'evening';
  timeOfDay?: WorkoutTimeOfDay;
  title: string;
  bengaliTitle: string;
  time: string; // "05:00" or "18:00" (24hr format)
  enabled: boolean;
  routineId: string;
  routineTitle: string;
  targetExercisesCount: number;
  defaultWorkSeconds: number;
  defaultRestSeconds: number;
  description: string;
}

export interface WorkoutAlarmSettings {
  morning: WorkoutAlarm;
  evening: WorkoutAlarm;
  soundEnabled: boolean;
  alarmVolume: number; // 0-100
}

export interface ActiveWorkoutState {
  routineId: string;
  routineTitle: string;
  currentExerciseIndex: number;
  currentSet?: number;
  totalSets?: number;
  selectedLevel?: DifficultyLevel;
  currentPhase: 'prep' | 'work' | 'rest' | 'completed';
  timeRemainingSeconds: number;
  totalDurationSeconds: number;
  elapsedSeconds: number;
  isRunning: boolean;
  totalExercises: number;
}

export interface WorkoutSessionLog {
  id: string;
  routineId: string;
  routineTitle: string;
  timestamp: string; // ISO string
  durationMinutes: number;
  exercisesCompleted: number;
  notes?: string;
  rating?: number; // 1-5
}

export interface BodyMetric {
  id: string;
  date: string; // YYYY-MM-DD
  weightKg?: number;
  waistCm?: number;
  chestCm?: number;
  notes?: string;
}

export interface UserProfile {
  name: string;
  age: number;
  experienceLevel: DifficultyLevel;
  dailyAvailableMinutes: number;
  equipment: EquipmentType[];
  goals: string[];
  preferredWorkoutDays: number[]; // 0=Sunday, 1=Monday ... 6=Saturday
  metrics: BodyMetric[];
  onboardingCompleted: boolean;
}

export interface AppSettings {
  soundEnabled: boolean;
  voiceCuesEnabled: boolean;
  soundVolume: number; // 0 to 100
  prepCountdownSeconds: number; // e.g. 5
  autoAdvanceExercises: boolean;
  accentColor: 'slate' | 'emerald' | 'amber' | 'cyan';
  alarms: WorkoutAlarmSettings;
}

export type ActiveTab = 'overview' | 'training' | 'timer' | 'progress' | 'calendar' | 'profile' | 'settings';
