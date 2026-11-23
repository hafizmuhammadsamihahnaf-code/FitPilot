import { DifficultyLevel } from '../types';

export interface LevelConfig {
  level: DifficultyLevel;
  name: string;
  bengaliName: string;
  subtitle: string;
  bengaliSubtitle: string;
  sets: number;
  restBetweenSetsSeconds: number;
  restBetweenExercisesSeconds: number;
  description: string;
  bengaliDescription: string;
  badgeColor: string;
}

export const FITNESS_LEVEL_CONFIGS: Record<DifficultyLevel, LevelConfig> = {
  beginner: {
    level: 'beginner',
    name: 'Beginner',
    bengaliName: 'বিগিনার (নতুনদের জন্য)',
    subtitle: '2 Sets • Gentle & Safe • Zero Gym Experience',
    bengaliSubtitle: '২ সেট • নিরাপদ ও সহজ • জিম ছাড়া ঘরে বসেই সহজে করার উপযোগী',
    sets: 2,
    restBetweenSetsSeconds: 25,
    restBetweenExercisesSeconds: 25,
    description: 'Perfect for starting out at home without any gym background. 2 controlled sets with ample rest protect joints and build habit.',
    bengaliDescription: 'যারা নতুন শুরু করছেন বা আগে কখনো জিমে যাননি তাদের জন্য তৈরি। প্রতিটি মূল ব্যায়ামে ২ সেট ও ২৫ সেকেন্ড বিশ্রাম, যাতে শরীরে অতিরিক্ত ক্লান্তি বা ক্র্যাম্প না হয়।',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  intermediate: {
    level: 'intermediate',
    name: 'Intermediate',
    bengaliName: 'ইন্টারমিডিয়েট (মধ্যম লেভেল)',
    subtitle: '3 Sets • Balanced Cadence • Muscle Tone & Stamina',
    bengaliSubtitle: '৩ সেট • ব্যালান্সড গতি • শক্তি ও সহনশীলতা বৃদ্ধি',
    sets: 3,
    restBetweenSetsSeconds: 20,
    restBetweenExercisesSeconds: 20,
    description: '3 sets with standard rest intervals. Solid progression to build muscle tone, endurance, and cardiovascular capacity.',
    bengaliDescription: 'প্রতিটি মূল ব্যায়ামে ৩ সেট ও ২০ সেকেন্ড বিশ্রাম। শরীরের স্ট্যামিনা ও পেশির সহনশীলতা বাড়াতে সহায়ক।',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  advanced: {
    level: 'advanced',
    name: 'Advanced / Pro',
    bengaliName: 'অ্যাডভান্সড / প্রো (উন্নত লেভেল)',
    subtitle: '4 Sets • High Intensity • Peak Conditioning',
    bengaliSubtitle: '৪ সেট • হাই ইনটেনসিটি • সর্বোচ্চ শারীরিক শক্তি ও কন্ডিশনিং',
    sets: 4,
    restBetweenSetsSeconds: 15,
    restBetweenExercisesSeconds: 20,
    description: '4 sets with brisk tempo and tight rest periods. For advanced conditioning and peak caloric burn.',
    bengaliDescription: 'প্রতিটি মূল ব্যায়ামে ৪ সেট ও ১৫ সেকেন্ড বিশ্রাম। সর্বোচ্চ ক্যালোরি বার্ন এবং প্রফেশনাল ফিটনেসের জন্য।',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  }
};

/**
 * Determines whether an exercise is a warm-up or cool-down (which only needs 1 set).
 */
export function isSingleSetExercise(exerciseId: string, isFirst: boolean, isLast: boolean): boolean {
  if (exerciseId === 'warmup_march' || exerciseId === 'childs_pose_breathe') {
    return true;
  }
  if (isFirst && (exerciseId.includes('warmup') || exerciseId === 'brisk_march_pulse')) {
    return true;
  }
  if (isLast && (exerciseId.includes('breathe') || exerciseId.includes('child'))) {
    return true;
  }
  return false;
}

/**
 * Calculates target sets for a specific exercise given the user's experience level.
 */
export function getExerciseTargetSets(exerciseId: string, level: DifficultyLevel, isFirst: boolean, isLast: boolean): number {
  if (isSingleSetExercise(exerciseId, isFirst, isLast)) {
    return 1;
  }
  return FITNESS_LEVEL_CONFIGS[level]?.sets || 2;
}

/**
 * Calculates realistic total workout duration in minutes for a routine given a difficulty level.
 */
export function calculateRoutineDurationMinutes(
  exercises: { exerciseId: string; workSeconds: number; restSeconds: number }[],
  level: DifficultyLevel
): number {
  const config = FITNESS_LEVEL_CONFIGS[level] || FITNESS_LEVEL_CONFIGS.beginner;
  let totalSeconds = 5; // prep time

  exercises.forEach((ex, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === exercises.length - 1;
    const sets = getExerciseTargetSets(ex.exerciseId, level, isFirst, isLast);

    for (let s = 1; s <= sets; s++) {
      totalSeconds += ex.workSeconds;
      if (s < sets) {
        // Rest between sets of the same exercise
        totalSeconds += config.restBetweenSetsSeconds;
      } else if (!isLast) {
        // Rest transition to next exercise
        totalSeconds += config.restBetweenExercisesSeconds || ex.restSeconds || 20;
      }
    }
  });

  return Math.max(1, Math.round(totalSeconds / 60));
}
