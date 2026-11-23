import { WorkoutRoutine } from '../types';

export const WORKOUT_ROUTINES: WorkoutRoutine[] = [
  // ===================== MONDAY =====================
  {
    id: 'routine_mon_morning',
    title: 'Monday Morning: Core Awakening & Mobility',
    subtitle: 'Kickstart your week with joint lubrication and core stability',
    category: 'core',
    difficulty: 'beginner',
    timeOfDay: 'morning',
    estimatedMinutes: 24,
    description: 'Designed to activate the nervous system after the weekend, mobilize spinal joints, and build rock-solid transverse abdominis foundation.',
    recommendedDays: ['Monday'],
    exercises: [
      { exerciseId: 'warmup_march', workSeconds: 60, restSeconds: 20 },
      { exerciseId: 'cat_cow', workSeconds: 45, restSeconds: 15 },
      { exerciseId: 'dead_bug', workSeconds: 50, restSeconds: 25, reps: '8 per side' },
      { exerciseId: 'bird_dog', workSeconds: 50, restSeconds: 25, reps: '8 per side' },
      { exerciseId: 'glute_bridge', workSeconds: 45, restSeconds: 20, reps: '15 reps' },
      { exerciseId: 'plank_hold', workSeconds: 40, restSeconds: 25 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 60, restSeconds: 0 }
    ]
  },
  {
    id: 'routine_mon_evening',
    title: 'Monday Evening: Posture & Desk Reset',
    subtitle: 'Decompress lumbar spine and reverse forward head posture',
    category: 'recovery',
    difficulty: 'beginner',
    timeOfDay: 'evening',
    estimatedMinutes: 20,
    description: 'Relieves upper back knots, opens tight chest pectorals, and resets spinal curvature after hours of desk and screen time.',
    recommendedDays: ['Monday'],
    exercises: [
      { exerciseId: 'cat_cow', workSeconds: 45, restSeconds: 15 },
      { exerciseId: 'doorway_chest_stretch', workSeconds: 50, restSeconds: 20 },
      { exerciseId: 'prone_y_t_w', workSeconds: 50, restSeconds: 20 },
      { exerciseId: 'wall_sit', workSeconds: 45, restSeconds: 25 },
      { exerciseId: 'cobra_stretch', workSeconds: 45, restSeconds: 15 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 60, restSeconds: 0 }
    ]
  },

  // ===================== TUESDAY =====================
  {
    id: 'routine_tue_morning',
    title: 'Tuesday Morning: Lower Body Power & Glutes',
    subtitle: 'Strengthen quads, activate glutes, and enhance hip drive',
    category: 'lower_body',
    difficulty: 'beginner',
    timeOfDay: 'morning',
    estimatedMinutes: 26,
    description: 'A dynamic lower chain builder that fuels metabolism, strengthens knee joints, and bulletproofs lower back stability.',
    recommendedDays: ['Tuesday'],
    exercises: [
      { exerciseId: 'warmup_march', workSeconds: 60, restSeconds: 20 },
      { exerciseId: 'bodyweight_squat', workSeconds: 50, restSeconds: 30, reps: '15 reps' },
      { exerciseId: 'reverse_lunge', workSeconds: 50, restSeconds: 30, reps: '10 per leg' },
      { exerciseId: 'glute_bridge', workSeconds: 45, restSeconds: 25, reps: '15 reps' },
      { exerciseId: 'standing_calf_raise', workSeconds: 45, restSeconds: 20, reps: '20 reps' },
      { exerciseId: 'wall_sit', workSeconds: 45, restSeconds: 30 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 60, restSeconds: 0 }
    ]
  },
  {
    id: 'routine_tue_evening',
    title: 'Tuesday Evening: Hip Opening & Spine Decompression',
    subtitle: 'Release hip flexor tension and soothe lower back ache',
    category: 'mobility',
    difficulty: 'beginner',
    timeOfDay: 'evening',
    estimatedMinutes: 18,
    description: 'Gentle myofascial lengthening to undo the anterior pelvic tilt caused by prolonged sitting.',
    recommendedDays: ['Tuesday'],
    exercises: [
      { exerciseId: 'cat_cow', workSeconds: 50, restSeconds: 15 },
      { exerciseId: 'single_leg_glute_bridge', workSeconds: 45, restSeconds: 20, reps: '8 per leg' },
      { exerciseId: 'bird_dog', workSeconds: 45, restSeconds: 20 },
      { exerciseId: 'cobra_stretch', workSeconds: 45, restSeconds: 20 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 75, restSeconds: 0 }
    ]
  },

  // ===================== WEDNESDAY =====================
  {
    id: 'routine_wed_morning',
    title: 'Wednesday Morning: Upper Body Push & Scapular Strength',
    subtitle: 'Chest, triceps, and upper back functional conditioning',
    category: 'upper_body',
    difficulty: 'intermediate',
    timeOfDay: 'morning',
    estimatedMinutes: 28,
    description: 'Progressive bodyweight pressing paired with posterior scapular stabilizers for shoulder health and upper body definition.',
    recommendedDays: ['Wednesday'],
    exercises: [
      { exerciseId: 'warmup_march', workSeconds: 60, restSeconds: 20 },
      { exerciseId: 'incline_pushup', workSeconds: 45, restSeconds: 25, reps: '12 reps' },
      { exerciseId: 'standard_pushup', workSeconds: 45, restSeconds: 30, reps: '10 reps' },
      { exerciseId: 'chair_dips', workSeconds: 45, restSeconds: 25, reps: '12 reps' },
      { exerciseId: 'prone_y_t_w', workSeconds: 50, restSeconds: 20 },
      { exerciseId: 'plank_hold', workSeconds: 45, restSeconds: 30 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 60, restSeconds: 0 }
    ]
  },
  {
    id: 'routine_wed_evening',
    title: 'Wednesday Evening: Thoracic Spine & Chest Release',
    subtitle: 'Midweek decompression for neck, shoulders, and chest',
    category: 'recovery',
    difficulty: 'beginner',
    timeOfDay: 'evening',
    estimatedMinutes: 16,
    description: 'Relaxes overstimulated shoulder trapezius muscles and expands lung capacity for calm, restful evening recovery.',
    recommendedDays: ['Wednesday'],
    exercises: [
      { exerciseId: 'doorway_chest_stretch', workSeconds: 50, restSeconds: 20 },
      { exerciseId: 'cat_cow', workSeconds: 50, restSeconds: 15 },
      { exerciseId: 'prone_y_t_w', workSeconds: 45, restSeconds: 20 },
      { exerciseId: 'cobra_stretch', workSeconds: 45, restSeconds: 15 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 90, restSeconds: 0 }
    ]
  },

  // ===================== THURSDAY =====================
  {
    id: 'routine_thu_morning',
    title: 'Thursday Morning: Cardio Tempo & Aerobic Vitality',
    subtitle: 'Low-impact intervals to ignite cardiovascular endurance',
    category: 'cardio',
    difficulty: 'beginner',
    timeOfDay: 'morning',
    estimatedMinutes: 24,
    description: 'Elevates oxygen delivery, pumps circulation to organs, and sharpens morning mental clarity without joint wear.',
    recommendedDays: ['Thursday'],
    exercises: [
      { exerciseId: 'warmup_march', workSeconds: 60, restSeconds: 20 },
      { exerciseId: 'brisk_march_pulse', workSeconds: 60, restSeconds: 25 },
      { exerciseId: 'skater_hops', workSeconds: 45, restSeconds: 20, reps: '20 hops' },
      { exerciseId: 'bodyweight_squat', workSeconds: 45, restSeconds: 25, reps: '15 reps' },
      { exerciseId: 'standing_calf_raise', workSeconds: 45, restSeconds: 20, reps: '20 reps' },
      { exerciseId: 'brisk_march_pulse', workSeconds: 60, restSeconds: 25 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 60, restSeconds: 0 }
    ]
  },
  {
    id: 'routine_thu_evening',
    title: 'Thursday Evening: Oblique & Pelvic Alignment',
    subtitle: 'Strengthen lateral core and relieve asymmetrical pelvic strain',
    category: 'core',
    difficulty: 'intermediate',
    timeOfDay: 'evening',
    estimatedMinutes: 20,
    description: 'Isolates obliques and deep spinal stabilizers, fortifying the waistline against posture degradation.',
    recommendedDays: ['Thursday'],
    exercises: [
      { exerciseId: 'cat_cow', workSeconds: 45, restSeconds: 15 },
      { exerciseId: 'side_plank', workSeconds: 40, restSeconds: 20 },
      { exerciseId: 'dead_bug', workSeconds: 50, restSeconds: 25 },
      { exerciseId: 'bird_dog', workSeconds: 50, restSeconds: 25 },
      { exerciseId: 'bicycle_crunches', workSeconds: 45, restSeconds: 20, reps: '16 reps' },
      { exerciseId: 'childs_pose_breathe', workSeconds: 60, restSeconds: 0 }
    ]
  },

  // ===================== FRIDAY =====================
  {
    id: 'routine_fri_morning',
    title: 'Friday Morning: Full-Body Functional Conditioning',
    subtitle: 'Compound movement patterns across the entire kinetic chain',
    category: 'full_body',
    difficulty: 'intermediate',
    timeOfDay: 'morning',
    estimatedMinutes: 30,
    description: 'Seamless integration of push, squat, hinge, and core bracing to conclude the work week feeling athletic and strong.',
    recommendedDays: ['Friday'],
    exercises: [
      { exerciseId: 'warmup_march', workSeconds: 60, restSeconds: 20 },
      { exerciseId: 'bodyweight_squat', workSeconds: 50, restSeconds: 25, reps: '15 reps' },
      { exerciseId: 'standard_pushup', workSeconds: 45, restSeconds: 30, reps: '10 reps' },
      { exerciseId: 'reverse_lunge', workSeconds: 50, restSeconds: 30, reps: '10 per leg' },
      { exerciseId: 'glute_bridge', workSeconds: 45, restSeconds: 20, reps: '15 reps' },
      { exerciseId: 'plank_hold', workSeconds: 45, restSeconds: 25 },
      { exerciseId: 'mountain_climbers', workSeconds: 45, restSeconds: 25, reps: '30 reps' },
      { exerciseId: 'childs_pose_breathe', workSeconds: 60, restSeconds: 0 }
    ]
  },
  {
    id: 'routine_fri_evening',
    title: 'Friday Evening: Total Body Stress Decompression',
    subtitle: 'Melt away accumulated work-week fatigue and muscle tension',
    category: 'recovery',
    difficulty: 'beginner',
    timeOfDay: 'evening',
    estimatedMinutes: 18,
    description: 'Gentle somatic unwinding designed to transition your body and mind peacefully into weekend mode.',
    recommendedDays: ['Friday'],
    exercises: [
      { exerciseId: 'cat_cow', workSeconds: 50, restSeconds: 15 },
      { exerciseId: 'doorway_chest_stretch', workSeconds: 50, restSeconds: 20 },
      { exerciseId: 'glute_bridge', workSeconds: 45, restSeconds: 20 },
      { exerciseId: 'cobra_stretch', workSeconds: 45, restSeconds: 15 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 90, restSeconds: 0 }
    ]
  },

  // ===================== SATURDAY =====================
  {
    id: 'routine_sat_morning',
    title: 'Saturday Morning: High-Energy Metabolic Ignition',
    subtitle: 'Weekend sweat session with dynamic fat-burning intervals',
    category: 'cardio',
    difficulty: 'intermediate',
    timeOfDay: 'morning',
    estimatedMinutes: 28,
    description: 'Fast-paced weekend conditioning to burn stored energy, maximize heart health, and build dynamic athleticism.',
    recommendedDays: ['Saturday'],
    exercises: [
      { exerciseId: 'warmup_march', workSeconds: 60, restSeconds: 20 },
      { exerciseId: 'sumo_squat', workSeconds: 45, restSeconds: 25, reps: '15 reps' },
      { exerciseId: 'mountain_climbers', workSeconds: 45, restSeconds: 25, reps: '30 reps' },
      { exerciseId: 'skater_hops', workSeconds: 45, restSeconds: 20, reps: '20 hops' },
      { exerciseId: 'chair_dips', workSeconds: 45, restSeconds: 25, reps: '12 reps' },
      { exerciseId: 'bicycle_crunches', workSeconds: 45, restSeconds: 20, reps: '16 reps' },
      { exerciseId: 'wall_sit', workSeconds: 45, restSeconds: 30 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 60, restSeconds: 0 }
    ]
  },
  {
    id: 'routine_sat_evening',
    title: 'Saturday Evening: Lower Body Deep Recovery & Calves',
    subtitle: 'Lengthen hamstrings, open tight hips, and soothe legs',
    category: 'mobility',
    difficulty: 'beginner',
    timeOfDay: 'evening',
    estimatedMinutes: 20,
    description: 'Targeted recovery to accelerate tissue repair and improve flexibility across hip flexors and ankles.',
    recommendedDays: ['Saturday'],
    exercises: [
      { exerciseId: 'standing_calf_raise', workSeconds: 45, restSeconds: 20, reps: '20 reps' },
      { exerciseId: 'glute_bridge', workSeconds: 45, restSeconds: 20 },
      { exerciseId: 'cat_cow', workSeconds: 50, restSeconds: 15 },
      { exerciseId: 'cobra_stretch', workSeconds: 45, restSeconds: 15 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 90, restSeconds: 0 }
    ]
  },

  // ===================== SUNDAY =====================
  {
    id: 'routine_sun_morning',
    title: 'Sunday Morning: Zen Flow & Gentle Spine Rejuvenation',
    subtitle: 'Calm mindful mobility, diaphragmatic flow, and joint alignment',
    category: 'recovery',
    difficulty: 'beginner',
    timeOfDay: 'morning',
    estimatedMinutes: 20,
    description: 'Slow, intentional restorative flows to refresh joints, stimulate digestive flow, and restore complete vitality.',
    recommendedDays: ['Sunday'],
    exercises: [
      { exerciseId: 'warmup_march', workSeconds: 60, restSeconds: 15 },
      { exerciseId: 'cat_cow', workSeconds: 50, restSeconds: 15 },
      { exerciseId: 'bird_dog', workSeconds: 45, restSeconds: 20 },
      { exerciseId: 'doorway_chest_stretch', workSeconds: 50, restSeconds: 20 },
      { exerciseId: 'cobra_stretch', workSeconds: 45, restSeconds: 15 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 90, restSeconds: 0 }
    ]
  },
  {
    id: 'routine_sun_evening',
    title: 'Sunday Evening: Deep Sleep Preparation & Mental Reset',
    subtitle: 'Lower cortisol, release back tension, and prepare for restful sleep',
    category: 'recovery',
    difficulty: 'beginner',
    timeOfDay: 'evening',
    estimatedMinutes: 16,
    description: 'Pre-bedtime breathing and restorative postures to trigger deep parasympathetic sleep and ready you for the week ahead.',
    recommendedDays: ['Sunday'],
    exercises: [
      { exerciseId: 'cat_cow', workSeconds: 50, restSeconds: 15 },
      { exerciseId: 'glute_bridge', workSeconds: 45, restSeconds: 20 },
      { exerciseId: 'dead_bug', workSeconds: 45, restSeconds: 20 },
      { exerciseId: 'cobra_stretch', workSeconds: 45, restSeconds: 15 },
      { exerciseId: 'childs_pose_breathe', workSeconds: 120, restSeconds: 0 }
    ]
  },

  // ===================== DISCIPLINE PENALTY =====================
  {
    id: 'routine_punishment',
    title: 'Discipline Penalty: Missed Workout Protocol',
    subtitle: 'Mandatory metabolic burn to eliminate laziness and protect your streak',
    category: 'full_body',
    difficulty: 'intermediate',
    timeOfDay: 'any',
    isPunishment: true,
    estimatedMinutes: 20,
    description: 'Enforced high-intensity conditioning triggered when a workout session is skipped. High-cadence movements to burn off inertia, reset discipline, and pay back missed exercise debt.',
    recommendedDays: ['Any missed day'],
    exercises: [
      { exerciseId: 'discipline_jumping_jacks', workSeconds: 45, restSeconds: 15, reps: '40 reps' },
      { exerciseId: 'bodyweight_squat', workSeconds: 50, restSeconds: 20, reps: '20 reps' },
      { exerciseId: 'discipline_high_knees', workSeconds: 45, restSeconds: 15, reps: '50 reps' },
      { exerciseId: 'standard_pushup', workSeconds: 45, restSeconds: 20, reps: '15 reps' },
      { exerciseId: 'discipline_wall_sit', workSeconds: 60, restSeconds: 20 },
      { exerciseId: 'mountain_climbers', workSeconds: 45, restSeconds: 20, reps: '30 reps' },
      { exerciseId: 'discipline_burpee', workSeconds: 45, restSeconds: 20, reps: '15 reps' },
      { exerciseId: 'childs_pose_breathe', workSeconds: 60, restSeconds: 0 }
    ]
  }
];

export const GET_ROUTINE_BY_ID = (id: string): WorkoutRoutine | undefined => {
  return WORKOUT_ROUTINES.find(r => r.id === id);
};

export const GET_ROUTINES_FOR_DAY = (dayName: string, timeOfDay?: 'morning' | 'evening'): WorkoutRoutine[] => {
  return WORKOUT_ROUTINES.filter(r => {
    const matchesDay = r.recommendedDays?.includes(dayName) || r.isPunishment;
    if (!matchesDay) return false;
    if (timeOfDay && r.timeOfDay && r.timeOfDay !== 'any') {
      return r.timeOfDay === timeOfDay;
    }
    return true;
  });
};
