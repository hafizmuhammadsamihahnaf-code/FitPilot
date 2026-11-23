import { Exercise } from '../types';

export const EXERCISES_LIBRARY: Exercise[] = [
  // --- Mobility & Warm-Up ---
  {
    id: 'warmup_march',
    name: 'Easy Marching & Arm Circles',
    bengaliName: 'সহজ মার্চিং ও আর্ম সার্কেল (ওয়ার্ম-আপ)',
    category: 'mobility',
    difficulty: 'beginner',
    durationSeconds: 60,
    restSeconds: 20,
    purpose: 'Gradually raise core temperature and lubricate the shoulder and hip joints.',
    bengaliPurpose: 'শরীরের তাপমাত্রা বৃদ্ধি করা এবং কাঁধ ও কোমরের জয়েন্টগুলোকে সচল ও পিচ্ছিল করা।',
    bengaliHowTo: [
      'সোজা হয়ে দাঁড়ান, বুক টানটান রাখুন এবং কাঁধ স্বাভাবিক রাখুন।',
      'এক জায়গায় দাঁড়িয়ে এক পা এক পা করে হাঁটু উঁচু করে মার্চ করতে থাকুন।',
      'মার্চ করার সাথে সাথে দুই হাত দিয়ে গোল বৃত্তাকার আকারে কাঁধ পেছন থেকে সামনে এবং সামনে থেকে পেছনে ঘোরান।',
      'পা নামানোর সময় নরমভাবে মাটিতে রাখুন যাতে কোনো ঝাঁকুনি না লাগে।'
    ],
    formCues: [
      'March rhythmically with soft knees on each landing.',
      'Roll shoulders up toward ears, backward, and down in slow full circles.',
      'Breathe smoothly and keep your chest gently upright without arching lower back.'
    ],
    bengaliFormCues: [
      'হাঁটু নামানোর সময় হাঁটু লক করবেন না, হালকা নরম রাখুন।',
      'ধীরেসুস্থে বড় বৃত্ত বানিয়ে কাঁধ ঘোরান, তাড়াহুড়ো করবেন না।',
      'কোমর পেছনে বাঁকাবেন না, পেট স্বাভাবিকভাবে শক্ত রাখুন।'
    ],
    bengaliMistakes: [
      'গোড়ালি সজোরে মাটিতে ফেলা।',
      'শ্বাস আটকে রেখে হাত ঘোরানো।'
    ],
    bengaliBreathing: 'নাক দিয়ে ধীরে ধীরে গভীর শ্বাস নিন এবং মুখ দিয়ে স্বাভাবিক ছন্দে ছাড়ুন।',
    easierVariation: 'Seated marching on a sturdy chair with gentle shoulder shrugs.',
    bengaliVariation: 'চেয়ারে বসে বসে পা উঁচু-নিচু করে এবং কাঁধ আলতো করে ঝাঁকিয়ে এটি করতে পারেন।',
    stopSafetyNote: 'If you feel clicking with sharp pain in your shoulder, reduce the circle diameter or simply march in place.',
    bengaliSafetyNote: 'কাঁধে কোনো তীব্র ব্যথা লাগলে হাতের বৃত্ত ছোট করুন বা শুধু সাধারণ মার্চিং করুন।',
    equipment: ['none'],
    targetMuscles: ['Calves', 'Hip Flexors', 'Deltoids', 'Rotator Cuff'],
    animationType: 'marching'
  },
  {
    id: 'cat_cow',
    name: 'Cat-Cow Spinal Wave',
    bengaliName: 'ক্যাট-কাউ মেরুদণ্ড সঞ্চালন (স্পাইনাল ওয়েভ)',
    category: 'mobility',
    difficulty: 'beginner',
    durationSeconds: 45,
    restSeconds: 15,
    purpose: 'Mobilize thoracic spine, release lower back tightness, and align pelvic tilt.',
    bengaliPurpose: 'মেরুদণ্ডের নমনীয়তা বৃদ্ধি করা, পিঠ ও কোমরের আড়ষ্টতা দূর করা এবং পেলভিসের ভারসাম্য ফিরিয়ে আনা।',
    bengaliHowTo: [
      'ম্যাটে দুই হাত ও দুই হাঁটু মাটিতে রেখে চারপায়ের মতো পজিশনে আসুন। হাত থাকবে কাঁধের ঠিক নিচে, হাঁটু থাকবে কোমরের নিচে।',
      'কাউ পোজ (Cow Pose): নাক দিয়ে গভীর শ্বাস নিতে নিতে পেট মাটির দিকে আলতো নামান, বুক সামনের দিকে খুলুন এবং দৃষ্টি কিছুটা উপরের দিকে রাখুন।',
      'ক্যাট পোজ (Cat Pose): মুখ দিয়ে শ্বাস ছাড়তে ছাড়তে মেঝেতে হাত দিয়ে চাপ দিয়ে পিঠ বিড়ালের মতো ধনুকের মতো বাঁকিয়ে উপরের দিকে তুলুন এবং চিবুক বুকের সাথে লাগান।',
      'প্রতিটি নড়াচড়া মসৃণভাবে একটানা করে যান।'
    ],
    formCues: [
      'Hands directly under shoulders, knees directly under hips on the mat.',
      'Inhale: drop belly gently, lift chest and gaze (Cow pose).',
      'Exhale: press ground away, round spine toward ceiling, tuck chin (Cat pose).',
      'Move vertebra by vertebra with no forcing at end ranges.'
    ],
    bengaliFormCues: [
      'হাতের তালু পুরোপুরি মেঝের উপর চেপে রাখুন।',
      'একটি একটি করে মেরুদণ্ডের অস্থি নাড়ানোর অনুভূতি অনুভব করুন।',
      'কোমর বা ঘাড়ে অতিরিক্ত চাপ দিয়ে জোর করবেন না।'
    ],
    bengaliMistakes: [
      'হাত কনুই থেকে ভাঁজ করে ফেলা।',
      'শ্বাস-প্রশ্বাসের ছন্দ ছাড়া দ্রুত নড়াচড়া করা।'
    ],
    bengaliBreathing: 'পেট নামানোর সময় শ্বাস নিন (Inhale), পিঠ গোল করার সময় পুরো শ্বাস ছাড়ুন (Exhale)।',
    easierVariation: 'Perform seated in a chair, placing hands on thighs and curling/extending the spine.',
    bengaliVariation: 'চেয়ারে বসে হাঁটুতে হাত রেখে পিঠ সামনের দিকে বাঁকিয়ে ও পেছনে নিয়ে অনুশীলন করতে পারেন।',
    stopSafetyNote: 'Do not force extreme neck extension if you experience cervical discomfort or dizziness.',
    bengaliSafetyNote: 'ঘাড়ে ব্যথা বা মাথা ঘোরার সমস্যা থাকলে ঘাড় বেশি উপরে তুলবেন না।',
    equipment: ['mat'],
    targetMuscles: ['Erector Spinae', 'Abdominals', 'Neck Flexors'],
    animationType: 'cat_cow'
  },
  {
    id: 'doorway_chest_stretch',
    name: 'Doorway Pectoral & Shoulder Opener',
    bengaliName: 'ডোরওয়ে চেস্ট ও শোল্ডার স্ট্রেচ',
    category: 'mobility',
    difficulty: 'beginner',
    durationSeconds: 50,
    restSeconds: 20,
    purpose: 'Reverse rounded desk shoulders and open tight anterior chest muscles.',
    bengaliPurpose: 'কম্পিউটারে বসে থাকার কারণে ঝুঁকে পড়া কাঁধ সোজা করা এবং বুকের টান পড়া মাংসপেশি প্রসারিত করা।',
    bengaliHowTo: [
      'একটি দরজা বা দরজার চৌকাঠের পাশে দাঁড়ান।',
      'কনুই ৯০ ডিগ্রি কোণে বাঁকিয়ে হাতের বাহুটি দরজার ফ্রেমের সাথে রাখুন।',
      'এক পা একটু সামনের দিকে এগিয়ে দিন এবং বুক ধীরে ধীরে সামনের দিকে সামান্য হেলান যাতে বুকে আলতো টান অনুভব হয়।',
      '২০-২৫ সেকেন্ড ধরে রেখে অন্য হাতে একইভাবে করুন।'
    ],
    formCues: [
      'Rest forearm against a door frame or wall with elbow at 90 degrees.',
      'Step forward gently with one leg until you feel a comfortable stretch across the chest.',
      'Keep core engaged and ribcage pinned down; do not arch your lower back.',
      'Breathe deeply into the ribcage for 25 seconds per side.'
    ],
    bengaliFormCues: [
      'কোমর পেছনের দিকে বাঁকাবেন না, শরীর সোজা রাখুন।',
      'বুকে আরামদায়ক স্ট্রেচ হবে, কিন্তু কোনো ঝাঁকুনি দেবেন না।'
    ],
    bengaliMistakes: [
      'কাঁধ কানের কাছে তুলে ফেলা।',
      'অতিরিক্ত জোর দিয়ে কাঁধ সামনের দিকে ঠেলে দেওয়া।'
    ],
    bengaliBreathing: 'ধীর ও দীর্ঘ শ্বাস নিন, শ্বাস ছাড়ার সময় মাংসপেশিগুলোকে শিথিল হতে দিন।',
    easierVariation: 'Stand with hands clasped behind back, gently extending arms backwards.',
    bengaliVariation: 'পেছনের দিকে দুই হাত একত্র করে ধরে আলতো করে বুক সোজা করতে পারেন।',
    stopSafetyNote: 'Stop immediately if you feel tingling down the arm or sharp shoulder impingement.',
    bengaliSafetyNote: 'হাতে ঝিঁঝিঁ ধরা বা কাঁধে সুচ ফোটার মতো অনুভূতি হলে তৎক্ষণাৎ বন্ধ করুন।',
    equipment: ['none'],
    targetMuscles: ['Pectoralis Major', 'Anterior Deltoid', 'Biceps Brachii'],
    animationType: 'stretch'
  },
  {
    id: 'childs_pose_breathe',
    name: 'Restorative Child\'s Pose Breathing',
    bengaliName: 'বালাসন বা চাইল্ডস পোজ (গভীর রিকভারি)',
    category: 'recovery',
    difficulty: 'beginner',
    durationSeconds: 60,
    restSeconds: 0,
    purpose: 'Promote parasympathetic recovery, decompress lumbar spine, and calm the nervous system.',
    bengaliPurpose: 'কোমরের মেরুদণ্ড চাপমুক্ত করা, মন ও স্নায়ুতন্ত্রকে শান্ত করা এবং গভীর অক্সিজেন প্রবাহ নিশ্চিত করা।',
    bengaliHowTo: [
      'ম্যাটের উপর হাঁটু গেড়ে বসুন। দুই পায়ের বৃদ্ধাঙ্গুলি একসাথে রাখুন এবং হাঁটু দুটি একটু ফাঁক করুন।',
      'নিতম্ব গোড়ালির উপর রেখে ধীরে ধীরে শরীর সামনের দিকে ঝুঁকিয়ে দিন।',
      'দুই হাত সামনের দিকে মেঝের উপর প্রসারিত করে দিন এবং কপাল আলতোভাবে ম্যাটে রাখুন।',
      'এই অবস্থানে বিশ্রাম নিয়ে বুক ও পিঠ ভরে শ্বাস নিন।'
    ],
    formCues: [
      'Kneel on the floor, bring big toes together, and separate knees wide.',
      'Hinge hips backward toward heels and walk hands forward along the floor.',
      'Rest forehead gently on the mat and breathe into the back ribs.',
      'Inhale for 4 seconds, exhale smoothly for 6 seconds.'
    ],
    bengaliFormCues: [
      'কাঁধ ও ঘাড় সম্পূর্ণ রিল্যাক্স রাখুন।',
      'শ্বাস নেওয়ার সময় পিঠের পাঁজরগুলো প্রসারিত হওয়ার অনুভূতি নিন।'
    ],
    bengaliMistakes: [
      'নিতম্ব গোড়ালি থেকে অনেক উপরে ভাসিয়ে রাখা।',
      'শ্বাস দ্রুত নেওয়া।'
    ],
    bengaliBreathing: '৪ সেকেন্ড ধরে শ্বাস নিন এবং ৬ সেকেন্ড ধরে সম্পূর্ণ শান্তভাবে শ্বাস ছাড়ুন।',
    easierVariation: 'Place a folded pillow or block between hips and heels for comfortable cushioning.',
    bengaliVariation: 'নিতম্ব ও গোড়ালির মাঝে একটি নরম বালিশ বা কুশন রেখে বসতে পারেন।',
    stopSafetyNote: 'If you have acute knee discomfort or hip pinch, place support under hips or relax on back.',
    bengaliSafetyNote: 'হাঁটুতে তীব্র চাপ অনুভূত হলে জোর করবেন না, পিঠে শুয়ে বিশ্রাম নিন।',
    equipment: ['mat'],
    targetMuscles: ['Latissimus Dorsi', 'Lower Back', 'Glutes'],
    animationType: 'childs_pose'
  },
  {
    id: 'cobra_stretch',
    name: 'Prone Cobra Spinal Extension',
    bengaliName: 'কোবরা বা ভুজঙ্গাসন স্ট্রেচ',
    category: 'recovery',
    difficulty: 'beginner',
    durationSeconds: 45,
    restSeconds: 20,
    purpose: 'Decompress lumbar discs and extend the front abdominal wall after hours of sitting.',
    bengaliPurpose: 'দীর্ঘ সময় বসার ফলে মেরুদণ্ডে জমা হওয়া চাপ মুক্ত করা এবং পেটের মাংসপেশি প্রসারিত করা।',
    bengaliHowTo: [
      'ম্যাটে উপুড় হয়ে পেট মেঝের সাথে রেখে শুয়ে পড়ুন। পা সোজা রাখুন।',
      'হাতের তালু কাঁধের ঠিক নিচে মেঝের উপর রাখুন, কনুই শরীরের কাছাকাছি রাখুন।',
      'হাতের ওপর হালকা চাপ দিয়ে বুক মেঝে থেকে ধীরে ধীরে উপরের দিকে তুলুন। নাভি মেঝের কাছাকাছি রাখুন।',
      'কাঁধ কান থেকে দূরে নামিয়ে রাখুন এবং দৃষ্টি সামনের দিকে রাখুন।'
    ],
    formCues: [
      'Lie face down on the mat, palms placed lightly under shoulders.',
      'Press hands down smoothly, peeling chest up while keeping hips pinned to the floor.',
      'Keep shoulders pulled down away from ears.',
      'Hold a gentle curve and breathe deeply.'
    ],
    bengaliFormCues: [
      'কোমরে কোনো খিল ধরার অনুভূতি হতে দেবেন না, সহনশীল মাত্রায় বুক তুলুন।',
      'কনুই একদম সোজা করে লক করবেন না, সামান্য ভাঁজ রাখুন।'
    ],
    bengaliMistakes: [
      'হঠাৎ ঝাঁকুনি দিয়ে শরীর তোলা।',
      'ঘাড় অতিরিক্ত পেছনে বাঁকানো।'
    ],
    bengaliBreathing: 'শরীর তোলার সময় শ্বাস নিন, উপরে ২ সেকেন্ড ধরে রাখুন, নামার সময় শ্বাস ছাড়ুন।',
    easierVariation: 'Sphinx Pose: Rest on forearms instead of hands for a milder spinal curve.',
    bengaliVariation: 'হাতের পরিবর্তে কনুই থেকে কবজি পর্যন্ত মাটিতে রেখে স্ফিঙ্কস পোজ করতে পারেন।',
    stopSafetyNote: 'Avoid pinching in the lumbar region; keep extension smooth and moderate.',
    bengaliSafetyNote: 'কোমরের নিচের দিকে চিমটি কাটার মতো ব্যথা লাগলে তৎক্ষণাৎ নামিয়ে নিন।',
    equipment: ['mat'],
    targetMuscles: ['Erector Spinae', 'Abdominals', 'Hip Flexors'],
    animationType: 'cobra'
  },

  // --- Lower Body Exercises ---
  {
    id: 'bodyweight_squat',
    name: 'Controlled Bodyweight Squat',
    bengaliName: 'বডিওয়েট স্কোয়াট (নিখুঁত ও নিয়ন্ত্রিত)',
    category: 'lower_body',
    difficulty: 'beginner',
    reps: '12 - 15 reps',
    durationSeconds: 50,
    restSeconds: 30,
    purpose: 'Build fundamental lower body strength and hip mobility for functional longevity.',
    bengaliPurpose: 'পায়ের উরু, হাঁটু ও নিতম্বের পেশি শক্তিশালী করা এবং আজীবন হাঁটাচলার কর্মক্ষমতা বজায় রাখা।',
    bengaliHowTo: [
      'দুই পা কাঁধের সমান চওড়া করে দাঁড়ান, পায়ের পাতা সামান্য (১৫-২০ ডিগ্রি) বাইরের দিকে ঘোরানো রাখুন।',
      'বুক সোজা রেখে দুই হাত সামনে টানটান বা বুকের কাছে জোড় করে রাখুন।',
      'একটি চেয়ারে বসার মতো করে কোমর পেছনের দিকে নিয়ে হাঁটু ভাঁজ করে নিচে নামুন (হাঁটু যেন পায়ের পাতার সোজা থাকে)।',
      'উরু মেঝের সমান্তরালে এলে গোড়ালিতে চাপ দিয়ে সোজা হয়ে দাঁড়ান এবং নিতম্ব শক্ত করুন।'
    ],
    formCues: [
      'Feet shoulder-width apart, toes turned outward 15 to 20 degrees.',
      'Hinge at hips first, then bend knees as if sitting back into a deep chair.',
      'Keep knees tracking inline with your second toe; do not let knees cave inward.',
      'Drive through midfoot and heel to stand tall, squeezing glutes softly at top.'
    ],
    bengaliFormCues: [
      'হাঁটু ভেতরের দিকে ভেঙে পড়তে দেবেন না।',
      'গোড়ালি সবসময় মেঝের উপর শক্তভাবে চেপে রাখবেন, পায়ের আঙুলের উপর ভর দেবেন না।',
      'পিঠ সবসময় ধনুকের মতো সোজা রাখুন, ঝুঁকে পড়বেন না।'
    ],
    bengaliMistakes: [
      'হাঁটু পায়ের আঙুলের চেয়ে অতিরিক্ত সামনে এগিয়ে নেওয়া।',
      'নামার সময় পিঠ কুঁজো করে ফেলা।'
    ],
    bengaliBreathing: 'নিচে নামার সময় নাক দিয়ে শ্বাস নিন (Inhale), উপরে ওঠার সময় মুখ দিয়ে শ্বাস ছাড়ুন (Exhale)।',
    easierVariation: 'Chair Squat: sit lightly onto a dining chair and stand back up without using hands.',
    bengaliVariation: 'পেছনে একটি শক্ত চেয়ার রাখুন, চেয়ারে আলতোভাবে বসে হাত না লাগিয়ে আবার উঠে দাঁড়ান।',
    stopSafetyNote: 'Stop immediately if you feel acute knee pain behind the kneecap or sharp lower back strain.',
    bengaliSafetyNote: 'হাঁটুর বাটির নিচে কোনো তীব্র খচখচে ব্যথা অনুভব হলে স্কোয়াট থামিয়ে দিন।',
    equipment: ['none'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    animationType: 'squat'
  },
  {
    id: 'reverse_lunge',
    name: 'Alternating Reverse Lunge',
    bengaliName: 'অল্টারনেটিং রিভার্স লাঞ্জেস',
    category: 'lower_body',
    difficulty: 'intermediate',
    reps: '10 per side',
    durationSeconds: 50,
    restSeconds: 30,
    purpose: 'Single-leg strength, balance stability, and hip flexor lengthening.',
    bengaliPurpose: 'এক এক পায়ের স্বতন্ত্র শক্তি বাড়ানো, শারীরিক ভারসাম্য এবং হিপের স্থিতিশীলতা উন্নত করা।',
    bengaliHowTo: [
      'সোজা হয়ে দাঁড়ান, হাত কোমরে রাখুন।',
      'এক পা নিয়ন্ত্রণের সাথে পেছনের দিকে বড় এক কদম ফেলুন।',
      'উভয় হাঁটু ৯০ ডিগ্রি কোণে ভাঁজ করে নিচে নামুন, পেছনের হাঁটু যেন মাটিতে স্পর্শ করার সামান্য উপরে থাকে।',
      'সামনের পায়ের গোড়ালিতে ভর দিয়ে চাপ দিয়ে আগের সোজা অবস্থানে ফিরে আসুন। এবার অন্য পায়ে করুন।'
    ],
    formCues: [
      'Stand tall, take a controlled step backward with one foot.',
      'Lower hips until both front and back knees bend to approximately 90 degrees.',
      'Keep torso proud and upright; drive through front heel to return to start.',
      'Switch legs with controlled tempo.'
    ],
    bengaliFormCues: [
      'সামনের হাঁটু পায়ের গোড়ালির ঠিক উপরে রাখুন।',
      'শরীরের উপরের অংশ একদম খাড়া রাখুন, সামনে ঝুঁকবেন না।'
    ],
    bengaliMistakes: [
      'পেছনের হাঁটু মেঝের উপর সজোরে আঘাত করা।',
      'ভারসাম্য হারিয়ে শরীর ডানে বা বাঁয়ে কাঁপানো।'
    ],
    bengaliBreathing: 'পা পেছনে নিয়ে নামার সময় শ্বাস নিন, ধাক্কা দিয়ে উপরে ওঠার সময় শ্বাস ছাড়ুন।',
    easierVariation: 'Hold onto a wall or sturdy chair for balance support during the step.',
    bengaliVariation: 'দেওয়াল বা শক্ত চেয়ার এক হাত দিয়ে ধরে ভারসাম্যের সাহায্য নিতে পারেন।',
    stopSafetyNote: 'Do not let front knee collapse inward or overshoot far past the toes.',
    bengaliSafetyNote: 'সামনের হাঁটু যেন ভেতরের দিকে না ঘুরে যায়।',
    equipment: ['none'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    animationType: 'squat'
  },
  {
    id: 'sumo_squat',
    name: 'Wide-Stance Sumo Squat',
    bengaliName: 'ওয়াইড স্ট্যান্স সুমো স্কোয়াট',
    category: 'lower_body',
    difficulty: 'intermediate',
    reps: '15 reps',
    durationSeconds: 45,
    restSeconds: 25,
    purpose: 'Target inner adductors, pelvic stability, and deep glute activation.',
    bengaliPurpose: 'উভয় ঊরুর ভেতরের পেশি (Adductors) এবং নিতম্বের গভীরে শক্তি সঞ্চার করা।',
    bengaliHowTo: [
      'কাঁধের চওড়ার চেয়ে বেশ বেশি ফাঁক করে দুই পা রাখুন।',
      'পায়ের পাতাগুলো ৪৫ ডিগ্রি বাইরের দিকে ঘুরিয়ে রাখুন।',
      'বুক একদম খাড়া রেখে হাঁটু দুটিকে পায়ের পাতার দিকে ঠেলে নিচে নামুন।',
      'নিচে ২ সেকেন্ড থেমে ভেতরের উরু চেপে ধরে গোড়ালিতে চাপ দিয়ে সোজা হন।'
    ],
    formCues: [
      'Stand with feet wider than shoulder-width, toes angled 45 degrees outward.',
      'Lower hips straight down between legs keeping torso upright.',
      'Press knees out in the direction of the toes throughout the descent.',
      'Squeeze inner thighs and glutes at the top.'
    ],
    bengaliFormCues: [
      'হাঁটু সবসময় বাইরের দিকে ছড়ানো রাখুন।',
      'উপরে উঠে হাঁটু সম্পূর্ণ লক করবেন না।'
    ],
    bengaliMistakes: [
      'কোমর পেছনে খুব বেশি বের করে দেওয়া।',
      'পায়ের ভেতরের পাতা মাটি থেকে উঠে যাওয়া।'
    ],
    bengaliBreathing: 'নিচে নামার সময় শ্বাস গ্রহণ এবং ওঠার সময় শ্বাস ত্যাগ করুন।',
    easierVariation: 'Reduce squat depth to 45 degrees of knee bend.',
    bengaliVariation: 'বেশি নিচে না নেমে অর্ধেক দূরত্ব পর্যন্ত নামুন।',
    stopSafetyNote: 'Avoid hyperextending knees when locking out at the top.',
    bengaliSafetyNote: 'উপরে ওঠার সময় হাঁটুতে অতিরিক্ত চাপ দিয়ে পেছনের দিকে ঠেলবেন না।',
    equipment: ['none'],
    targetMuscles: ['Adductors', 'Gluteus Medius', 'Quadriceps'],
    animationType: 'squat'
  },
  {
    id: 'glute_bridge',
    name: 'Floor Glute Bridge',
    bengaliName: 'ফ্লোর গ্লুট ব্রিজ (কোমর ও নিতম্ব শক্তিশালীকরণ)',
    category: 'lower_body',
    difficulty: 'beginner',
    durationSeconds: 45,
    reps: '12 - 15 reps',
    restSeconds: 25,
    purpose: 'Activate dormant gluteal muscles and decompress anterior hip flexors.',
    bengaliPurpose: 'অলস গ্লুট পেশি সচল করা, হিপ ফ্লেক্সর রিল্যাক্স করা এবং লোয়ার ব্যাকের ব্যথা প্রতিরোধ করা।',
    bengaliHowTo: [
      'ম্যাটে চিত হয়ে শুয়ে পড়ুন, দুই হাঁটু ভাঁজ করে পায়ের পাতা নিতম্বের কাছে মেঝের উপর সমান্তরাল রাখুন।',
      'হাত দুটি শরীরের পাশে মেঝের উপর টানটান রাখুন।',
      'পেটের নাভি ভেতরের দিকে হালকা টেনে গোড়ালিতে চাপ দিয়ে নিতম্ব মেঝে থেকে উপরে তুলুন।',
      'কাঁধ থেকে হাঁটু পর্যন্ত যেন একটি সোজা সরলরেখা তৈরি হয়। উপরে ২ সেকেন্ড নিতম্ব শক্ত করে ধরে রাখুন এবং ধীরে ধীরে নামান।'
    ],
    formCues: [
      'Lie on back with knees bent, feet flat on the floor hip-width apart.',
      'Gently brace core so lower back is neutral against floor.',
      'Press through heels to lift hips until thighs and torso form a straight line.',
      'Hold the squeeze at top for 2 full seconds; do not hyperextend lower back.'
    ],
    bengaliFormCues: [
      'কোমর অতিরিক্ত ধনুকের মতো বাঁকাবেন না, শুধু নিতম্ব ও উরুর শক্তিতে তুলুন।',
      'হাঁটু যেন ডানে বা বাঁয়ে ছড়িয়ে না যায়।'
    ],
    bengaliMistakes: [
      'পায়ের আঙুলে ভর দিয়ে কোমর তোলা।',
      'উপরে ওঠার সময় পেট অতিরিক্ত ফুলিয়ে তোলা।'
    ],
    bengaliBreathing: 'কোমর তোলার সময় শ্বাস ছাড়ুন (Exhale), নিচে নামানোর সময় শ্বাস নিন (Inhale)।',
    easierVariation: 'Lift hips only halfway, or perform isometric hold for 15 seconds at a time.',
    bengaliVariation: 'কোমর অর্ধেক উচ্চতায় তুলুন অথবা উপরে একটানা ১৫ সেকেন্ড ধরে রাখুন।',
    stopSafetyNote: 'If your lower back arches excessively, focus on a posterior pelvic tuck before lifting.',
    bengaliSafetyNote: 'কোমরে কোনো ব্যথা হলে কোমর কিছুটা কম উঁচুতে তুলুন।',
    equipment: ['mat'],
    targetMuscles: ['Gluteus Maximus', 'Hamstrings', 'Deep Abdominals'],
    animationType: 'glute_bridge'
  },
  {
    id: 'standing_calf_raise',
    name: 'Standing Calf Raise & Ankle Balance',
    bengaliName: 'স্ট্যান্ডিং কাফ রেইজ (পায়ের পেশি ও গোড়ালি)',
    category: 'lower_body',
    difficulty: 'beginner',
    durationSeconds: 45,
    reps: '20 reps',
    restSeconds: 20,
    purpose: 'Strengthen calf complex, stabilize ankles, and assist venous blood return.',
    bengaliPurpose: 'পায়ের ডিম বা কাফ পেশি মজবুত করা, গোড়ালির ভারসাম্য এবং রক্ত সঞ্চালন দ্রুত করা।',
    bengaliHowTo: [
      'সোজা হয়ে দাঁড়ান, দুই পা সামান্য ফাঁক রাখুন। ভারসাম্যের জন্য সামনে দেওয়াল ছুঁয়ে রাখতে পারেন।',
      'পায়ের বুড়ো আঙুলে ভর দিয়ে গোড়ালি মেঝের ওপর যতটা সম্ভব উঁচুতে তুলুন।',
      'সর্বোচ্চ পয়েন্টে ১ সেকেন্ড ধরে রাখুন যাতে কাফ পেশিতে তীব্র সংকোচন অনুভব হয়।',
      'ধীরে ধীরে গোড়ালি মেঝের স্পর্শে নামিয়ে আনুন।'
    ],
    formCues: [
      'Stand feet hip-width apart near a wall for light balance guidance.',
      'Rise up high onto the balls of your feet, pressing through big toes.',
      'Pause at the peak for 1 second, then lower down under slow control.'
    ],
    bengaliFormCues: [
      'পায়ের গোড়ালি বাইরের দিকে কাত হতে দেবেন না।',
      'শরীরের ঝাঁকুনি ছাড়াই মসৃণভাবে ওঠানামা করুন।'
    ],
    bengaliMistakes: [
      'দ্রুত লাফানোর মতো করা।',
      'গোড়ালি পুরোপুরি নামার আগেই আবার ওঠা।'
    ],
    bengaliBreathing: 'উপরে ওঠার সময় শ্বাস ছাড়ুন, নামার সময় শ্বাস গ্রহণ করুন।',
    easierVariation: 'Perform seated on a chair with knees at 90 degrees.',
    bengaliVariation: 'চেয়ারে বসে হাঁটু ৯০ ডিগ্রিতে রেখে গোড়ালি ওঠানামা করুন।',
    stopSafetyNote: 'Keep ankles neutral without rolling outward onto pinky toes.',
    bengaliSafetyNote: 'গোড়ালির সন্ধি যেন বাইরের দিকে ঘুরে না যায়।',
    equipment: ['none'],
    targetMuscles: ['Gastrocnemius', 'Soleus', 'Ankle Stabilizers'],
    animationType: 'marching'
  },
  {
    id: 'wall_sit',
    name: 'Isometric Wall Sit',
    bengaliName: 'আইসোমেট্রিক ওয়াল সিট (দেওয়ালে হেলান দেওয়া আসন)',
    category: 'lower_body',
    difficulty: 'intermediate',
    durationSeconds: 45,
    restSeconds: 30,
    purpose: 'Build sustained quadriceps endurance and mental fortitude with zero joint impact.',
    bengaliPurpose: 'উরুর পেশির সহনশীলতা ও মানসিক দৃঢ়তা তৈরি করা, কোনো জয়েন্ট ইনজুরি ছাড়াই।',
    bengaliHowTo: [
      'একটি সমতল দেওয়ালের সাথে পিঠ লাগিয়ে দাঁড়ান।',
      'পা সামনে এগিয়ে নিয়ে পিঠ দেওয়ালে ঘষে নিচে নামুন, যেন আপনি একটি অদৃশ্য চেয়ারে বসেছেন।',
      'হাঁটু ৯০ ডিগ্রি কোণে থাকবে এবং হাঁটু ঠিক গোড়ালির উপরে থাকবে।',
      'হাত দুটি বুকের উপর বেঁধে রাখুন এবং সময় শেষ হওয়া পর্যন্ত স্থির থাকুন।'
    ],
    formCues: [
      'Lean back against a bare wall and slide down until knees are at 90 degrees.',
      'Ensure knees are directly stacked above ankles, not past toes.',
      'Keep head, upper back, and lower spine flat against the wall.',
      'Rest hands across chest; do not push against thighs.'
    ],
    bengaliFormCues: [
      'উরু মেঝের সাথে সমান্তরালে রাখুন।',
      'হাতে ভর দিয়ে উরুর ওপর চাপ দেবেন না।'
    ],
    bengaliMistakes: [
      'দেওয়াল থেকে পিঠ সরিয়ে নেওয়া।',
      'হাঁটু পায়ের আঙুলের চেয়ে অনেক বেশি সামনে নিয়ে যাওয়া।'
    ],
    bengaliBreathing: 'দাঁত শক্ত না করে নাক দিয়ে নিয়মিত গভীর শ্বাস-প্রশ্বাস বজায় রাখুন।',
    easierVariation: 'Hold at a 45-degree angle rather than deep 90 degrees.',
    bengaliVariation: '৯০ ডিগ্রি পর্যন্ত না নেমে একটু উঁচুতে ৪৫ ডিগ্রি কোণে বসুন।',
    stopSafetyNote: 'Slide up immediately if you experience sharp patellar kneecap pain.',
    bengaliSafetyNote: 'হাঁটুর বাটিতে তীব্র জ্বালাপোড়া বা ব্যথা লাগলে দেওয়াল বেয়ে উঠে দাঁড়ান।',
    equipment: ['none'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves', 'Core'],
    animationType: 'squat'
  },

  // --- Upper Body Exercises ---
  {
    id: 'incline_pushup',
    name: 'Incline Push-Up',
    bengaliName: 'ইনক্লাইন পুশ-আপ (টেবিল বা বেঞ্চে)',
    category: 'upper_body',
    difficulty: 'beginner',
    durationSeconds: 45,
    reps: '8 - 12 reps',
    restSeconds: 30,
    purpose: 'Develop upper body pushing strength with scalable, joint-friendly angle.',
    bengaliPurpose: 'বুক, কাঁধ ও ট্রাইসেপসের শক্তি তৈরি করা, কবজি ও কাঁধের ওপর অতিরিক্ত চাপ ছাড়া।',
    bengaliHowTo: [
      'একটি শক্ত টেবিল, বেঞ্চ বা প্ল্যাটফর্মের প্রান্তে দুই হাত কাঁধের চেয়ে একটু চওড়া করে রাখুন।',
      'পা পেছনে নিয়ে পুরো শরীর মাথা থেকে গোড়ালি পর্যন্ত একটি সোজা তক্তার মতো টানটান করুন।',
      'কনুই পেছনের দিকে ৪৫ ডিগ্রি কোণে ভাঁজ করে বুক ধীরে ধীরে বেঞ্চের কাছাকাছি নামান।',
      'হাতের তালুতে চাপ দিয়ে শরীর আগের অবস্থানে ঠেলে তুলুন।'
    ],
    formCues: [
      'Place hands on an elevated sturdy surface (desk, counter, or bench).',
      'Body forms a straight rigid plank from heels to crown of head.',
      'Lower chest toward surface, elbows tracking back at 45 degrees like an arrow.',
      'Press back smoothly until arms are straight without shrugging shoulders.'
    ],
    bengaliFormCues: [
      'কনুই যেন দুই পাশে ডানা মেলার মতো ৯০ ডিগ্রিতে ছড়িয়ে না যায়।',
      'কোমর ঝুলে পড়তে দেবেন না, পেট সবসময় শক্ত রাখুন।'
    ],
    bengaliMistakes: [
      'ঘাড় সামনের দিকে ঝুলিয়ে নামা।',
      'কোমর ভেঙে পিঠ বাঁকানো।'
    ],
    bengaliBreathing: 'নিচে নামার সময় শ্বাস নিন, উপরে ওঠার সময় দম ছাড়ুন।',
    easierVariation: 'Wall push-up: stand 2 feet from a bare wall and perform controlled pressing.',
    bengaliVariation: 'দেওয়াল থেকে ২ ফুট দূরে দাঁড়িয়ে দেওয়ালে হাত রেখে ওয়াল পুশ-আপ করুন।',
    stopSafetyNote: 'If you feel anterior shoulder impingement, decrease angle or rotate hands slightly outward.',
    bengaliSafetyNote: 'কাঁধের সামনের দিকে খটকা লাগলে হাতের অবস্থান সামান্য বাইরে ঘোরান।',
    equipment: ['none'],
    targetMuscles: ['Pectoralis Major', 'Triceps', 'Anterior Deltoid', 'Core'],
    animationType: 'pushup'
  },
  {
    id: 'standard_pushup',
    name: 'Floor Standard Push-Up',
    bengaliName: 'স্ট্যান্ডার্ড ফ্লোর পুশ-আপ',
    category: 'upper_body',
    difficulty: 'intermediate',
    durationSeconds: 45,
    reps: '10 - 15 reps',
    restSeconds: 30,
    purpose: 'Total chest, shoulder, tricep, and core kinetic chain integration.',
    bengaliPurpose: 'বুক, বাহু, কাঁধ এবং পেটের পেশিকে একসাথে নিখুঁত শক্তিতে রূপান্তর করা।',
    bengaliHowTo: [
      'ম্যাটের ওপর হাই-প্ল্যাঙ্ক পজিশনে আসুন। হাত থাকবে কাঁধের চেয়ে একটু বেশি চওড়া।',
      'পেট শক্ত রাখুন, নিতম্ব শক্ত রাখুন। শরীর যেন পুরো একটা লোহার শলাকার মতো সোজা থাকে।',
      'কনুই ৪৫ ডিগ্রিতে রেখে বুক মেঝের ২ ইঞ্চি পর্যন্ত নামিয়ে আনুন।',
      'হাতের তালু মেঝের গভীরে চাপ দিয়ে শরীর এক ধাক্কায় সোজা করে তুলুন।'
    ],
    formCues: [
      'Hands slightly wider than shoulder width on the floor.',
      'Squeeze glutes and brace abs so your body lowers as one solid unit.',
      'Descend until chest is 2 inches above the floor.',
      'Drive palms hard into the ground to lock out elbows.'
    ],
    bengaliFormCues: [
      'মাথা সোজা রাখুন, মেঝের দিকে এক ফুট সামনে দৃষ্টি রাখুন।',
      'কোমর যেন নিচে না ঝোলে বা ওপরে না ওঠে।'
    ],
    bengaliMistakes: [
      'শুধু ঘাড় নামিয়ে পুশ-আপ করার ভান করা।',
      'কনুই দুই দিকে ৯০ ডিগ্রিতে বের করে রাখা।'
    ],
    bengaliBreathing: 'নামার সময় শ্বাস নিন, মেঝেকে ঠেলে ওঠার সময় শ্বাস ছাড়ুন।',
    easierVariation: 'Kneeling Push-Up: keep knees on the mat with straight hip alignment.',
    bengaliVariation: 'হাঁটু মাটিতে রেখে হাঁটু-পুশ-আপ (Knee Push-Up) দিয়ে শুরু করুন।',
    stopSafetyNote: 'Do not allow hips to sag or head to jut forward.',
    bengaliSafetyNote: 'কোমর ভেঙে পড়লে রিপ বন্ধ করুন এবং হাঁটু পুশ-আপে চলে আসুন।',
    equipment: ['mat'],
    targetMuscles: ['Pectoralis Major', 'Triceps Brachii', 'Core'],
    animationType: 'pushup'
  },
  {
    id: 'chair_dips',
    name: 'Bench / Chair Tricep Dips',
    bengaliName: 'চেয়ার বা বেঞ্চ ট্রাইসেপ ডিপস',
    category: 'upper_body',
    difficulty: 'intermediate',
    durationSeconds: 45,
    reps: '10 - 12 reps',
    restSeconds: 25,
    purpose: 'Direct tricep hypertrophy and shoulder stability.',
    bengaliPurpose: 'হাতের পেছনের মাংসপেশি (Triceps) সুদৃঢ় করা এবং হাতের চামড়ার ঝুলে পড়া রোধ করা।',
    bengaliHowTo: [
      'একটি শক্ত চেয়ারের কিনারায় বসুন, নিতম্বের ঠিক পাশে হাত দিয়ে কিনারায় শক্ত করে ধরুন।',
      'পা সামনে এগিয়ে দিন, নিতম্ব চেয়ারের কিনারার সামান্য সামনে নামিয়ে আনুন।',
      'কনুই পেছনের দিকে ৯০ ডিগ্রি পর্যন্ত ভাঁজ করে শরীর নিচে নামান।',
      'হাতের তালুতে জোর দিয়ে কনুই সোজা করে শরীর ওপরে তুলুন।'
    ],
    formCues: [
      'Sit on edge of sturdy chair, hands gripping edge beside hips.',
      'Slide hips off the front with knees bent at 90 degrees.',
      'Lower hips by bending elbows straight backward until 90 degrees.',
      'Press through palms to lockout arms, keeping chest proud.'
    ],
    bengaliFormCues: [
      'পিঠ যেন চেয়ারের কিনারার কাছাকাছি থাকে, সামনে দূরে চলে যাবেন না।',
      'বুক খুলে টানটান রাখুন।'
    ],
    bengaliMistakes: [
      'কনুই অতিরিক্ত বেশি ভাঁজ করে কাঁধে চাপ দেওয়া।',
      'কাঁধ কানের কাছে কুঁচকে ফেলা।'
    ],
    bengaliBreathing: 'নিচে নামার সময় শ্বাস নিন, ওপরে ওঠার সময় জোরালো শ্বাস ছাড়ুন।',
    easierVariation: 'Keep feet close to chair with knees deeply bent to take weight off arms.',
    bengaliVariation: 'পা চেয়ারের একদম কাছে রেখে হাঁটু পুরো ভাঁজ করে হাতের ওজন কমান।',
    stopSafetyNote: 'Do not dip below 90 degrees elbow flexion to safeguard shoulder capsule.',
    bengaliSafetyNote: 'কনুই ৯০ ডিগ্রির চেয়ে বেশি নামাবেন না যাতে কাঁধের সন্ধি নিরাপদ থাকে।',
    equipment: ['chair'],
    targetMuscles: ['Triceps Brachii', 'Anterior Deltoids', 'Pectorals'],
    animationType: 'pushup'
  },

  // --- Core & Abs Exercises ---
  {
    id: 'bird_dog',
    name: 'Bird Dog Diagonal Reach',
    bengaliName: 'বার্ড ডগ ডায়াগনাল এক্সটেনশন (কোমর ও কোর)',
    category: 'core',
    difficulty: 'beginner',
    durationSeconds: 50,
    reps: '8 per side',
    restSeconds: 25,
    purpose: 'Anti-rotation core stability and posterior chain coordination without spine flexion.',
    bengaliPurpose: 'কোমরের কোনো ক্ষতি ছাড়াই পেটের গভীর পেশির স্থায়িত্ব এবং শারীরিক ভারসাম্য বৃদ্ধি।',
    bengaliHowTo: [
      'ম্যাটের ওপর চার পায়ে (হাতে ও হাঁটুতে) ভারসাম্য নিয়ে বসুন।',
      'একই সাথে ডান হাত সামনের দিকে এবং বাঁ পা পেছনের দিকে মেঝের সমান্তরালে টানটান করে বাড়ান।',
      'সর্বোচ্চ পয়েন্টে ২ সেকেন্ড থামুন, শরীর একদম সোজা রাখুন।',
      'ধীরে ধীরে আগের জায়গায় ফিরিয়ে এনে এবার বাঁ হাত ও ডান পা দিয়ে একইভাবে করুন।'
    ],
    formCues: [
      'Start on all fours with neutral spine and core gently braced.',
      'Simultaneously reach right arm forward and left leg straight back.',
      'Keep hips square to the ground; do not allow lower back to arch.',
      'Pause for 2 seconds at peak extension, then return and switch sides.'
    ],
    bengaliFormCues: [
      'কোমর যেন ডান বা বাঁয়ে হেলে না যায়।',
      'পা মেঝের চেয়ে বেশি উঁচুতে তুলবেন না, পিঠ সোজা রাখুন।'
    ],
    bengaliMistakes: [
      'হাত বা পা দ্রুত নামিয়ে ফেলা।',
      'পিঠ ধনুকের মতো বাঁকিয়ে ফেলা।'
    ],
    bengaliBreathing: 'হাত-পা বাড়ানোর সময় শ্বাস ছাড়ুন, নামানোর সময় শ্বাস নিন।',
    easierVariation: 'Move only the legs first, keeping both hands firmly grounded on the floor.',
    bengaliVariation: 'প্রথমে হাত মাটিতে রেখে শুধু এক এক পা পেছনে বাড়িয়ে অভ্যাস করুন।',
    stopSafetyNote: 'Do not raise the leg higher than parallel with floor to prevent lumbar hyperextension.',
    bengaliSafetyNote: 'পা অতিরিক্ত উঁচুতে তুললে কোমরে টান লাগতে পারে, তাই মেঝের সমান রাখুন।',
    equipment: ['mat'],
    targetMuscles: ['Multifidus', 'Gluteus Maximus', 'Deltoids', 'Transverse Abdominis'],
    animationType: 'bird_dog'
  },
  {
    id: 'dead_bug',
    name: 'Dead Bug Core Press',
    bengaliName: 'ডেড বাগ কোর প্রেস (নিরাপদ অ্যাবস)',
    category: 'core',
    difficulty: 'beginner',
    durationSeconds: 50,
    reps: '6 per side',
    restSeconds: 25,
    purpose: 'Train deep transverse abdominis bracing while maintaining lumbar contact with floor.',
    bengaliPurpose: 'কোমরে বিন্দুমাত্র চাপ না ফেলে পেটের গভীর অ্যাবস পেশি (Transverse Abdominis) শক্তিশালী করা।',
    bengaliHowTo: [
      'ম্যাটে চিত হয়ে শুয়ে দুই হাত ছাদের দিকে সোজা তুলে রাখুন এবং দুই হাঁটু ৯০ ডিগ্রিতে শূন্যে রাখুন (টেবিল-টপ পজিশন)।',
      'কোমরের নিচটা পুরোপুরি মেঝের সাথে শক্তভাবে চেপে রাখুন (কোনো ফাঁকা থাকবে না)।',
      'ধীরে ধীরে ডান হাত মাথার পেছনে নামান এবং একই সাথে বাঁ পা সামনের দিকে সোজা করে মেঝের সামান্য ওপরে আনুন।',
      'কোমরের চাপ বজায় রেখে আগের পজিশনে ফিরুন এবং বিপরীত হাত-পায়ে করুন।'
    ],
    formCues: [
      'Lie on back with arms straight toward ceiling, knees bent at 90 degrees (tabletop).',
      'Flatten lower back completely against the floor so no hand could slide under.',
      'Slowly lower right arm back and extend left leg forward hovering just off floor.',
      'Return to center under control, maintaining back contact throughout.'
    ],
    bengaliFormCues: [
      'পুরো ব্যায়ামের সময় পিঠের নিচ যেন মেঝে থেকে ১ মিলিমিটারও না ওঠে।',
      'ধীর ও অত্যন্ত নিয়ন্ত্রিত গতিতে করুন।'
    ],
    bengaliMistakes: [
      'পা বাড়ানোর সময় পিঠ মেঝের থেকে ওপরে ফাঁকা হয়ে যাওয়া।',
      'শ্বাস আটকে রাখা।'
    ],
    bengaliBreathing: 'হাত-পা দূরে নেওয়ার সময় মুখ দিয়ে ধীরে ধীরে শ্বাস ছাড়ুন, মাঝখানে ফিরে শ্বাস নিন।',
    easierVariation: 'Tap heels to the floor with knees bent instead of extending leg straight out.',
    bengaliVariation: 'পা পুরোপুরি না বাড়িয়ে শুধু গোড়ালি মাটিতে আলতো ছুঁয়ে ফিরিয়ে আনুন।',
    stopSafetyNote: 'If lower back arches off floor, stop extension and reduce range of motion.',
    bengaliSafetyNote: 'পিঠ মেঝে থেকে উঠে গেলে পা খুব বেশি নিচে নামাবেন না।',
    equipment: ['mat'],
    targetMuscles: ['Transverse Abdominis', 'Rectus Abdominis', 'Hip Flexors'],
    animationType: 'dead_bug'
  },
  {
    id: 'plank_hold',
    name: 'Forearm Plank Hold',
    bengaliName: 'ফোরআর্ম প্ল্যাঙ্ক হোল্ড (পুরো শরীরের কোর)',
    category: 'core',
    difficulty: 'intermediate',
    durationSeconds: 45,
    restSeconds: 30,
    purpose: 'Total body anti-extension stability and shoulder girdle endurance.',
    bengaliPurpose: 'পুরো শরীরের কোর, কাঁধ ও পিঠকে ইস্পাতের মতো শক্ত করা।',
    bengaliHowTo: [
      'ম্যাটে দুই কনুই কাঁধের নিচে মেঝের ওপর রেখে উপুড় হয়ে আসুন।',
      'পায়ের আঙুলের ওপর ভর দিয়ে শরীর মাটি থেকে তুলে নিন।',
      'মাথা, ঘাড়, পিঠ, কোমর ও পা একদম একটি সোজা তক্তার মতো লাইন তৈরি করবে।',
      'পেট ভেতরের দিকে টেনে নিতম্ব শক্ত করে নির্দিষ্ট সময় ধরে স্থির থাকুন।'
    ],
    formCues: [
      'Rest on forearms, elbows directly beneath shoulders.',
      'Press floor away through forearms to fill the space between shoulder blades.',
      'Squeeze glutes, quads, and pull belly button toward spine.',
      'Hold a rigid line from crown of head to heels, breathing evenly.'
    ],
    bengaliFormCues: [
      'কনুই দিয়ে মেঝেতে চাপ দিয়ে দুই কাঁধের মাঝের অংশ ভরাট রাখুন।',
      'কোমর যেন নিচে ঝুলে না পড়ে বা ওপরে পাহাড়ের মতো না ওঠে।'
    ],
    bengaliMistakes: [
      'কোমর মেঝের দিকে ঝুলিয়ে দেওয়া।',
      'দম বন্ধ করে রাখা।'
    ],
    bengaliBreathing: 'নাক দিয়ে নিয়মিত মসৃণ ও স্থির শ্বাস-প্রশ্বাস বজায় রাখুন।',
    easierVariation: 'Perform plank with knees grounded on the mat.',
    bengaliVariation: 'হাঁটু মাটিতে রেখে নী প্ল্যাঙ্ক (Knee Plank) হিসেবে করুন।',
    stopSafetyNote: 'Discontinue hold immediately if your lower back sags and begins aching.',
    bengaliSafetyNote: 'কোমরে ব্যথা লাগলে সাথে সাথে হাঁটু মাটিতে নামিয়ে নিন।',
    equipment: ['mat'],
    targetMuscles: ['Transverse Abdominis', 'Rectus Abdominis', 'Glutes', 'Serratus Anterior'],
    animationType: 'plank'
  },
  {
    id: 'side_plank',
    name: 'Side Plank Stability Hold',
    bengaliName: 'সাইড প্ল্যাঙ্ক (পার্শ্বীয় অ্যাবস ও কোমর)',
    category: 'core',
    difficulty: 'intermediate',
    durationSeconds: 40,
    restSeconds: 20,
    purpose: 'Strengthen lateral quadratus lumborum, obliques, and pelvic balance.',
    bengaliPurpose: 'পাশের মাংসপেশি (Obliques) মজবুত করা এবং কোমরের পাশের ভারসাম্য বাড়ানো।',
    bengaliHowTo: [
      'একপাশে কাত হয়ে শুয়ে পড়ুন, কনুই থাকবে কাঁধের ঠিক নিচে।',
      'এক পায়ের ওপর অন্য পা রাখুন এবং হাত কোমরে রাখুন।',
      'কোমর মেঝে থেকে ওপরে তুলে শরীর মাথা থেকে পা পর্যন্ত তির্যক সোজা লাইনে আনুন।',
      '২০ সেকেন্ড স্থির থেকে অন্যপাশে একইভাবে করুন।'
    ],
    formCues: [
      'Lie on side, propped on forearm with elbow directly below shoulder.',
      'Stack feet or stagger them for balance.',
      'Lift hips off floor until body forms a clean diagonal line.',
      'Hold 20 seconds per side without letting top hip roll forward.'
    ],
    bengaliFormCues: [
      'কোমর যেন মেঝের দিকে নিচু হয়ে না যায়।',
      'কাঁধের জয়েন্টে শরীর ঝুলিয়ে রাখবেন না, কনুই দিয়ে মেঝেকে ঠেলুন।'
    ],
    bengaliMistakes: [
      'শরীর সামনের দিকে ঝুঁকে পড়া।',
      'ঘাড় নিচে ঝুলিয়ে দেওয়া।'
    ],
    bengaliBreathing: 'শান্তভাবে নিয়মিত শ্বাস-প্রশ্বাস চালান।',
    easierVariation: 'Bend bottom knee at 90 degrees on the floor for shorter lever arm.',
    bengaliVariation: 'নিচের হাঁটু মাটিতে ভাঁজ করে রেখে ভর নিন।',
    stopSafetyNote: 'Keep shoulder packed down; do not sink into the joint capsule.',
    bengaliSafetyNote: 'কাঁধে অতিরিক্ত চাপ অনুভূত হলে কনুইর অবস্থান ঠিক করুন।',
    equipment: ['mat'],
    targetMuscles: ['Obliques', 'Quadratus Lumborum', 'Gluteus Medius'],
    animationType: 'plank'
  },

  // --- Discipline / Cardio Exercises ---
  {
    id: 'discipline_jumping_jacks',
    name: 'Discipline Jumping Jacks',
    bengaliName: 'ডিসিপ্লিন জাম্পিং জ্যাকস (দ্রুত এনার্জি)',
    category: 'cardio',
    difficulty: 'intermediate',
    durationSeconds: 45,
    restSeconds: 15,
    reps: '40 reps',
    purpose: 'Rapidly elevate heart rate and burn off sluggishness from missed workout.',
    bengaliPurpose: 'হৃৎস্পন্দন দ্রুত বৃদ্ধি করা, শরীরে রক্ত সঞ্চালন বাড়ানো এবং আলসেমি দূর করা।',
    bengaliHowTo: [
      'সোজা হয়ে দাঁড়ান, হাত শরীরের পাশে এবং পা একসাথে রাখুন।',
      'লাফ দিয়ে দুই পা দুই পাশে ছড়িয়ে দিন এবং একই সাথে দুই হাত মাথার ওপর তুলুন।',
      'আবার হালকা লাফে আগের অবস্থানে ফিরুন এবং একটানা ছন্দ বজায় রাখুন।'
    ],
    formCues: [
      'Jump feet wide while bringing arms overhead with brisk snap.',
      'Land softly on balls of feet, keeping knees springy.',
      'Maintain an unbroken tempo to punish sluggishness.'
    ],
    bengaliFormCues: [
      'পায়ের পাতার ওপর ভর দিয়ে আলতোভাবে নামুন, গোড়ালি আছড়াবেন না।',
      'হাঁটু সামান্য নরম রাখুন।'
    ],
    bengaliMistakes: [
      'শক্ত পায়ে মাটিতে পড়ে হাঁটুতে ঝাঁকুনি দেওয়া।'
    ],
    bengaliBreathing: 'ছন্দে ছন্দে নাক দিয়ে শ্বাস ও মুখ দিয়ে শ্বাস ছাড়ুন।',
    easierVariation: 'Step jacks without jumping if knees need zero impact.',
    bengaliVariation: 'না লাফিয়ে এক এক পা পাশে বাড়িয়ে হাত মাথার ওপর তুলুন (Step Jack)।',
    stopSafetyNote: 'Keep knees slightly soft upon each landing.',
    bengaliSafetyNote: 'হাঁটু সবসময় নরম রাখুন যাতে কোনো ধাক্কা না লাগে।',
    equipment: ['none'],
    targetMuscles: ['Cardiovascular', 'Calves', 'Deltoids', 'Core'],
    animationType: 'jumping_jack'
  },
  {
    id: 'discipline_wall_sit',
    name: 'Discipline Wall Sit Inferno',
    bengaliName: 'ডিসিপ্লিন ওয়াল সিট (মানসিক সংকল্প)',
    category: 'lower_body',
    difficulty: 'intermediate',
    durationSeconds: 60,
    restSeconds: 20,
    purpose: 'Mental grit test: continuous isometric quadricep fatigue to restore focus.',
    bengaliPurpose: 'মানসিক সংকল্প ও উরুর সহনশীলতার কঠিন পরীক্ষা, শৃঙ্খলা ফিরিয়ে আনা।',
    bengaliHowTo: [
      'দেওয়ালের সাথে পিঠ ঠেকিয়ে ৯০ ডিগ্রি কোণে বসে থাকুন।',
      'হাত বুকের ওপর আড়াআড়ি রাখুন, উরুর ওপর হাত রাখবেন না।',
      'টাইমার শেষ হওয়া পর্যন্ত স্থান ত্যাগ করবেন না।'
    ],
    formCues: [
      'Back firmly against wall, knees bent at exact 90 degrees.',
      'Keep arms off knees—cross them over chest to feel the full burn.',
      'Breathe through teeth; refuse to quit before the timer expires.'
    ],
    bengaliFormCues: [
      'উরু মেঝের সমান্তরাল ৯০ ডিগ্রিতে রাখুন।',
      'পিঠ পুরোপুরি দেওয়ালের সাথে লাগিয়ে রাখুন।'
    ],
    bengaliMistakes: [
      'হাত দিয়ে হাঁটুতে ভর দেওয়া।'
    ],
    bengaliBreathing: 'শান্ত ও গভীর শ্বাস নিয়ে মনের সাথে লড়াই করুন।',
    easierVariation: 'Sit at a 60-degree angle rather than deep 90 degrees.',
    bengaliVariation: '৬০ ডিগ্রিতে হালকা উঁচুতে বসুন।',
    stopSafetyNote: 'Slide up immediately if sharp patellar pain occurs.',
    bengaliSafetyNote: 'হাঁটুর বাটিতে তীব্র চাপ লাগলে আস্তে উঠে দাঁড়ান।',
    equipment: ['none'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves'],
    animationType: 'squat'
  },
  {
    id: 'discipline_high_knees',
    name: 'Sprint High Knees Blitz',
    bengaliName: 'হাই নীজ স্প্রিন্ট (উচ্চ গতি)',
    category: 'cardio',
    difficulty: 'intermediate',
    durationSeconds: 45,
    restSeconds: 15,
    reps: '50 reps',
    purpose: 'Maximum calorie burn & cardio punishment for skipping training.',
    bengaliPurpose: 'সর্বোচ্চ ক্যালোরি পোড়ানো এবং শরীরকে চাঙ্গা করে তোলা।',
    bengaliHowTo: [
      'এক জায়গায় দাঁড়িয়ে যত দ্রুত সম্ভব হাঁটু কোমর সমান উঁচুতে তুলে দৌড়ান।',
      'হাতের কনুই ৯০ ডিগ্রিতে রেখে দ্রুত হাত চালান।',
      'শরীর সোজা রাখুন।'
    ],
    formCues: [
      'Drive knees up to hip height rapidly as if running away from laziness.',
      'Pump arms rhythmically in sync with knee drives.',
      'Stay upright with core braced tight.'
    ],
    bengaliFormCues: [
      'পায়ের আঙুলের ওপর ভর দিয়ে দৌড়ান।'
    ],
    bengaliMistakes: [
      'পেছন দিকে শরীর হেলিয়ে ফেলা।'
    ],
    bengaliBreathing: 'ছন্দে ছন্দে শ্বাস-প্রশ্বাস রাখুন।',
    easierVariation: 'March vigorously in place lifting knees high without jumping.',
    bengaliVariation: 'না দৌড়ে দ্রুত গতিতে হাঁটু তুলে মার্চ করুন।',
    stopSafetyNote: 'Land lightly on balls of feet; do not slam heels down.',
    bengaliSafetyNote: 'গোড়ালি মাটিতে আছড়াবেন না।',
    equipment: ['none'],
    targetMuscles: ['Hip Flexors', 'Quadriceps', 'Cardiovascular'],
    animationType: 'marching'
  },
  {
    id: 'discipline_burpee',
    name: 'Discipline Burpee Blast',
    bengaliName: 'ডিসিপ্লিন বার্পি ব্লাস্ট',
    category: 'full_body',
    difficulty: 'intermediate',
    durationSeconds: 45,
    restSeconds: 20,
    reps: '15 reps',
    purpose: 'The ultimate discipline restorer—full-body metabolic inferno.',
    bengaliPurpose: 'পুরো শরীরের জন্য সবচেয়ে কার্যকরী মেটাবলিক ব্যায়াম।',
    bengaliHowTo: [
      'দাঁড়ানো অবস্থা থেকে দুই হাত মাটিতে রেখে স্কোয়াট পজিশনে আসুন।',
      'লাফ দিয়ে দুই পা পেছনে নিয়ে হাই প্ল্যাঙ্ক পজিশনে যান।',
      'বুক মাটিতে ছুঁইয়ে পুশ-আপ দিন, তারপর আবার লাফ দিয়ে পা হাতের কাছে আনুন।',
      'হাত ওপরে তুলে লাফ দিয়ে সোজা হয়ে দাঁড়ান।'
    ],
    formCues: [
      'Drop hands to floor, kick feet back into a solid plank.',
      'Lower chest swiftly, press up, jump feet forward to hands.',
      'Explode upward into a jump with hands overhead.'
    ],
    bengaliFormCues: [
      'প্ল্যাঙ্কে যাওয়ার সময় কোমর ঝুলতে দেবেন না।'
    ],
    bengaliMistakes: [
      'কোমরে ঝাঁকুনি দেওয়া।'
    ],
    bengaliBreathing: 'প্রতিটি পর্যায়ে নিয়ন্ত্রিত শ্বাস রাখুন।',
    easierVariation: 'Step back to plank without the push-up and stand tall without the jump.',
    bengaliVariation: 'লাফ ও পুশ-আপ ছাড়া এক পা এক পা পেছনে নিয়ে আবার সামনে এনে সোজা হন।',
    stopSafetyNote: 'Keep lower back braced in plank; do not let hips sag.',
    bengaliSafetyNote: 'কোমরে কোনো ব্যথা থাকলে জাম্প এড়িয়ে চলুন।',
    equipment: ['none'],
    targetMuscles: ['Pectorals', 'Core', 'Quadriceps', 'Full Body'],
    animationType: 'jumping_jack'
  },
  {
    id: 'prone_y_t_w',
    name: 'Prone Y-T-W Scapular Raises',
    bengaliName: 'প্রোন ওয়াই-টি-ডব্লিউ শোল্ডার রেইজ',
    category: 'upper_body',
    difficulty: 'beginner',
    durationSeconds: 50,
    restSeconds: 20,
    purpose: 'Strengthen lower/mid trapezius and rhomboids to restore upper back posture and scapular stability.',
    bengaliPurpose: 'পিঠের ওপরের অংশের পেশি এবং কাঁধ মজবুত করা, যার ফলে কুঁজো ভাব দূর হয় এবং কাঁধের জয়েন্ট সুরক্ষিত থাকে।',
    bengaliHowTo: [
      'ম্যাটে উপুড় হয়ে পেট ও কপাল মাটির দিকে রেখে শুয়ে পড়ুন।',
      'Y পজিশন: দুই হাত মাথার ওপর ইংরেজি Y অক্ষরের মতো ছড়িয়ে দিন, বুড়ো আঙুল উপরের দিকে তুলে হাত মাটি থেকে ২ ইঞ্চি উঁচুতে তুলুন এবং স্ক্যাপুলা সঙ্কুচিত করুন।',
      'T পজিশন: এবার হাত দুই পাশে সোজা ইংরেজি T অক্ষরের মতো মেলে ধরে একইভাবে মাটি থেকে তুলুন।',
      'W পজিশন: কনুই ভাঁজ করে ইংরেজি W অক্ষরের মতো বানিয়ে কাঁধের পেছনের পেশি শক্ত করে টানুন।',
      'প্রতিটি পজিশনে ২ সেকেন্ড ধরে রেখে স্বাভাবিক ছন্দে পুনরাবৃত্তি করুন।'
    ],
    formCues: [
      'Lie prone on the mat with forehead resting lightly, neck aligned.',
      'Thumbs pointed toward ceiling to encourage external shoulder rotation.',
      'Squeeze shoulder blades together and downward, away from ears.'
    ],
    bengaliFormCues: [
      'কাঁধ কানের দিকে তুলবেন না, পেছনের দিকে টেনে রাখবেন।',
      'বুড়ো আঙুল সবসময় সিলিংয়ের দিকে নির্দেশ করবে।',
      'ঘাড় শিথিল রাখুন, কপাল হালকা নিচে রাখুন।'
    ],
    bengaliMistakes: [
      'ঘাড় অতিরিক্ত পেছনের দিকে বাঁকিয়ে ফেলা।',
      'শ্বাস বন্ধ করে রাখা।'
    ],
    bengaliBreathing: 'হাত তোলার সময় শ্বাস ছাড়ুন, নামানোর সময় শ্বাস নিন।',
    easierVariation: 'Perform standing, hinged at hips or against a wall.',
    bengaliVariation: 'দেয়ালে হেলান দিয়ে বা সামান্য সামনে ঝুঁকে দাঁড়িয়ে এটি করতে পারেন।',
    stopSafetyNote: 'Keep movements strictly within a pain-free range if experiencing impingement.',
    bengaliSafetyNote: 'কাঁধে ব্যথা বা খিঁচুনির অনুভূতি হলে হাত বেশি উঁচুতে তুলবেন না।',
    equipment: ['mat'],
    targetMuscles: ['Rhomboids', 'Lower Trapezius', 'Posterior Deltoids', 'Rotator Cuff'],
    animationType: 'superman'
  },
  {
    id: 'single_leg_glute_bridge',
    name: 'Single-Leg Glute Bridge',
    bengaliName: 'এক পায়ের গ্লুট ব্রিজ',
    category: 'lower_body',
    difficulty: 'intermediate',
    durationSeconds: 45,
    restSeconds: 20,
    reps: '8 per leg',
    purpose: 'Isolate unilateral glute activation, correct pelvic imbalances, and protect lower back.',
    bengaliPurpose: 'এক এক পায়ের নিতম্বের পেশি আলাদাভাবে শক্তিশালী করা এবং পেলভিসের ভারসাম্য রক্ষা করা।',
    bengaliHowTo: [
      'ম্যাটে চিৎ হয়ে শুয়ে পড়ুন এবং দুই হাঁটু ভাঁজ করে পা মাটিতে রাখুন।',
      'এক পা সোজা উপরের দিকে তুলুন বা অপর হাঁটুর সাথে সমান্তরাল করে সোজা রাখুন।',
      'মাটিতে থাকা পায়ের গোড়ালিতে ভর দিয়ে কোমর ও নিতম্ব মেঝের ওপর তুলুন যতক্ষণ না শরীর হাঁটু থেকে কাঁধ পর্যন্ত সোজা হয়।',
      'উপরে উঠে ১-২ সেকেন্ড নিতম্বের পেশি শক্ত রাখুন, তারপর ধীরে ধীরে নামান।'
    ],
    formCues: [
      'Drive firmly through the planted heel, not the toes.',
      'Keep hips level and square—avoid dropping the elevated hip.',
      'Squeeze the working glute at the peak without overarching lumbar spine.'
    ],
    bengaliFormCues: [
      'মাটিতে থাকা পায়ের গোড়ালি দিয়ে চাপ দিন।',
      'কোমর যাতে একদিকে হেলে না পড়ে সেদিকে খেয়াল রাখুন।'
    ],
    bengaliMistakes: [
      'কোমর অতিরিক্ত উপরে তুলে পিঠ ধনুকের মতো বাঁকানো।'
    ],
    bengaliBreathing: 'কোমর উপরে তোলার সময় শ্বাস ছাড়ুন, নামানোর সময় শ্বাস নিন।',
    easierVariation: 'Standard two-leg glute bridge.',
    bengaliVariation: 'দুই পা মাটিতে রেখেই সাধারণ গ্লুট ব্রিজ করুন।',
    stopSafetyNote: 'Stop if you feel cramping in the hamstring; bring heel closer to hips.',
    bengaliSafetyNote: 'হ্যামস্ট্রিংয়ে টান লাগলে গোড়ালি নিতম্বের আরেকটু কাছে নিয়ে আসুন।',
    equipment: ['mat'],
    targetMuscles: ['Gluteus Maximus', 'Hamstrings', 'Core', 'Erector Spinae'],
    animationType: 'glute_bridge'
  },
  {
    id: 'brisk_march_pulse',
    name: 'Brisk March & Core Pulse',
    bengaliName: 'দ্রুত মার্চিং ও কোর পালস',
    category: 'cardio',
    difficulty: 'beginner',
    durationSeconds: 60,
    restSeconds: 25,
    purpose: 'Elevate cardiac output, warm large muscle groups, and engage anterior core stabilizers.',
    bengaliPurpose: 'হৃৎস্পন্দন বাড়ানো, পুরো শরীরে রক্ত চলাচল বৃদ্ধি করা এবং পেটের ভেতরের কোর পেশি সক্রিয় করা।',
    bengaliHowTo: [
      'সোজা হয়ে দাঁড়ান, বুক টানটান রাখুন এবং পেটের পেশি সামান্য শক্ত করে রাখুন।',
      'একটু দ্রুত গতিতে এক পা এক পা করে হাঁটু উঁচু করে মার্চ করতে থাকুন।',
      'প্রতিটি মার্চে বিপরীত হাত কনুই ভাঁজ করে ছন্দের সাথে সঞ্চালন করুন।',
      'পায়ের আঙুলের নরম অংশে ল্যান্ড করুন যাতে জয়েন্টে কোনো চাপ না পড়ে।'
    ],
    formCues: [
      'Maintain a brisk cadence while keeping posture tall and proud.',
      'Brace your core as each knee drives upward.',
      'Land softly on the ball of the foot with relaxed shoulders.'
    ],
    bengaliFormCues: [
      'বুক টানটান রাখুন এবং ছন্দ বজায় রাখুন।',
      'পায়ের পাতায় আলতো করে নামুন।'
    ],
    bengaliMistakes: [
      'মাটিতে জোরে জোরে পা আছড়ানো।'
    ],
    bengaliBreathing: 'নাক দিয়ে নিয়মিত শ্বাস নিন এবং মুখ দিয়ে স্বাভাবিক ছন্দে ছাড়ুন।',
    easierVariation: 'Gentle slow marching holding onto a chair.',
    bengaliVariation: 'চেয়ারে হাত রেখে বা ধীরে ধীরে সাধারণ গতিতে মার্চ করুন।',
    stopSafetyNote: 'Stay within a comfortable heart rate range.',
    bengaliSafetyNote: 'অতিরিক্ত শ্বাসকষ্ট হলে গতি কমিয়ে নিন।',
    equipment: ['none'],
    targetMuscles: ['Hip Flexors', 'Calves', 'Core', 'Cardiovascular'],
    animationType: 'marching'
  },
  {
    id: 'skater_hops',
    name: 'Low-Impact Skater Hops',
    bengaliName: 'লো-ইমপ্যাক্ট স্কেটার হপস',
    category: 'cardio',
    difficulty: 'beginner',
    durationSeconds: 45,
    restSeconds: 20,
    reps: '20 hops',
    purpose: 'Improve lateral hip stability, balance, and athletic agility while burning calories.',
    bengaliPurpose: 'কোমরের দুই পাশের পেশি ও ব্যালান্স উন্নত করা এবং চটপটে ভাব ফিরিয়ে আনা।',
    bengaliHowTo: [
      'হাঁটু সামান্য ভাঁজ করে অ্যাথলেটিক পজিশনে দাঁড়ান।',
      'ডান পায়ের দিকে সামান্য লাফ দিন বা বড় স্টেপ নিন এবং বাম পা ডান পায়ের পেছনের দিকে ডায়াগোনালি আনুন।',
      'এবার বাম পায়ের দিকে লাফ দিন এবং ডান পা বাম পায়ের পেছনে আনুন (আইস স্কেটিংয়ের মতো)।',
      'হাতের নড়াচড়া আইস স্কেটারদের মতো ছন্দে রাখুন।'
    ],
    formCues: [
      'Hinge slightly at hips, keep chest upright and knees soft.',
      'Bound or step laterally with control, landing lightly.',
      'Swing opposite arm across body for counterbalance.'
    ],
    bengaliFormCues: [
      'হাঁটু নরম রাখুন, লাফ দিয়ে নামার সময় হাঁটু লক করবেন না।',
      'হাত দিয়ে শরীরের ভারসাম্য বজায় রাখুন।'
    ],
    bengaliMistakes: [
      'ভারসাম্য হারিয়ে শক্তভাবে মাটিতে ল্যান্ড করা।'
    ],
    bengaliBreathing: 'ছন্দে ছন্দে শ্বাস গ্রহণ ও ত্যাগ করুন।',
    easierVariation: 'Step-touch side to side without jumping.',
    bengaliVariation: 'লাফ ছাড়া এক পাশে এক পাশে পা বাড়িয়ে স্টেপ করুন।',
    stopSafetyNote: 'Avoid aggressive jumps if you have acute knee or ankle instability.',
    bengaliSafetyNote: 'হাঁটু বা গোড়ালিতে ব্যথা থাকলে লাফাবেন না, স্টেপ করুন।',
    equipment: ['none'],
    targetMuscles: ['Gluteus Medius', 'Quadriceps', 'Calves', 'Cardiovascular'],
    animationType: 'jumping_jack'
  },
  {
    id: 'bicycle_crunches',
    name: 'Controlled Bicycle Crunches',
    bengaliName: 'কন্ট্রোলড বাইসাইকেল ক্রাঞ্চ',
    category: 'core',
    difficulty: 'intermediate',
    durationSeconds: 45,
    restSeconds: 20,
    reps: '16 reps',
    purpose: 'Strengthen rectus abdominis and internal/external obliques through rotational core torque.',
    bengaliPurpose: 'পেটের সম্মুখভাগ এবং দুই পাশের ওবলিক পেশিকে শক্তিশালী ও সুগঠিত করা।',
    bengaliHowTo: [
      'ম্যাটে চিৎ হয়ে শুয়ে পড়ুন, দুই হাত মাথার পেছনে আলতো করে রাখুন।',
      'দুই পা মাটি থেকে তুলে হাঁটু ৯০ ডিগ্রিতে রাখুন।',
      'ডান কনুই বাম হাঁটুর দিকে আনুন এবং সাথে সাথে ডান পা সামনে সোজা বাড়িয়ে দিন।',
      'এবার বিপরীত পাশে একইভাবে বাম কনুই ডান হাঁটুর দিকে আনুন (সাইকেল চালানোর মতো)।',
      'ধীর ও নিয়ন্ত্রিত গতিতে এক এক করে করুন।'
    ],
    formCues: [
      'Rotate from your ribcage and shoulders, not by pulling on your neck.',
      'Slow down: a 2-second controlled rotation yields 3x the core engagement of rushing.',
      'Keep your lower back pressed firmly into the floor.'
    ],
    bengaliFormCues: [
      'ঘাড় টেনে আনবেন না, বুক ও পিঠ থেকে মোচড় দিন।',
      'তাড়াহুড়ো না করে ধীরে ধীরে পেশির টান অনুভব করুন।'
    ],
    bengaliMistakes: [
      'হাতে ঘাড় টেনে মাথা সামনে বাঁকানো।',
      'পিঠের নিচের অংশ মাটি থেকে উঠে যাওয়া।'
    ],
    bengaliBreathing: 'মোচড় দেওয়ার সময় শ্বাস ছাড়ুন, মাঝখানে শ্বাস নিন।',
    easierVariation: 'Keep feet on the floor and lift one knee at a time to meet opposite elbow.',
    bengaliVariation: 'পা মাটিতে রেখে এক এক করে হাঁটু তুলে বিপরীত কনুই ছোঁয়ান।',
    stopSafetyNote: 'Never tug your cervical spine with your hands.',
    bengaliSafetyNote: 'হাতে ঘাড়ে কোনো চাপ দেবেন না।',
    equipment: ['mat'],
    targetMuscles: ['Obliques', 'Rectus Abdominis', 'Hip Flexors'],
    animationType: 'dead_bug'
  },
  {
    id: 'mountain_climbers',
    name: 'Slow Tempo Mountain Climbers',
    bengaliName: 'স্লো টেম্পো মাউন্টেন ক্লাইম্বার',
    category: 'cardio',
    difficulty: 'intermediate',
    durationSeconds: 45,
    restSeconds: 25,
    reps: '30 reps',
    purpose: 'Unite isometric shoulder/plank stabilization with dynamic core contraction and stamina.',
    bengaliPurpose: 'হাত ও কাঁধের শক্তি বৃদ্ধির সাথে সাথে পেটের কোর ও সহনশীলতা বৃদ্ধি করা।',
    bengaliHowTo: [
      'উঁচু পুশ-আপ বা হাই প্ল্যাঙ্ক পজিশনে আসুন। হাত থাকবে কাঁধের নিচে, শরীর থাকবে সোজা তক্তার মতো।',
      'ডান হাঁটু বুকের কাছে টেনে আনুন, পেটের পেশি শক্ত রাখুন।',
      'ডান পা পেছনে নিয়ে সাথে সাথে বাম হাঁটু বুকের দিকে আনুন।',
      'কোমর বেশি উঁচুতে না তুলে বা নিচে না ঝুলিয়ে একটানা ছন্দে চালিয়ে যান।'
    ],
    formCues: [
      'Start in a tall, solid high plank with wrists directly beneath shoulders.',
      'Drive knee toward chest under strict control, keeping hips low.',
      'Maintain a flat back—do not let hips pike up toward the ceiling.'
    ],
    bengaliFormCues: [
      'কোমর পিঠের সমান সমান্তরালে রাখুন, ওপরে তুলবেন না।',
      'হাতের তালু দিয়ে মেঝেতে শক্ত চাপ বজায় রাখুন।'
    ],
    bengaliMistakes: [
      'কোমর অতিরিক্ত উপরে তুলে ত্রিভুজের মতো করা।',
      'হাঁটু নামানোর সময় মাটিতে সজোরে ফেলা।'
    ],
    bengaliBreathing: 'ছন্দে ছন্দে নিয়মিত শ্বাস-প্রশ্বাস রাখুন।',
    easierVariation: 'Perform elevated with hands placed on a sturdy bench or wall.',
    bengaliVariation: 'চেয়ার বা টেবিলের প্রান্তে হাত রেখে কিছুটা দাঁড়িয়ে এই ব্যায়াম করুন।',
    stopSafetyNote: 'Ensure wrists are comfortable; switch to knuckles or push-up bars if needed.',
    bengaliSafetyNote: 'কব্জিতে ব্যথা হলে দেয়ালে বা উঁচু বেঞ্চে হাত রেখে করুন।',
    equipment: ['mat'],
    targetMuscles: ['Abdominals', 'Deltoids', 'Hip Flexors', 'Quadriceps'],
    animationType: 'jumping_jack'
  }
];

export const GET_EXERCISE_BY_ID = (id: string): Exercise | undefined => {
  return EXERCISES_LIBRARY.find(ex => ex.id === id);
};
