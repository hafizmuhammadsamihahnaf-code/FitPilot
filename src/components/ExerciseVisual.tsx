import React, { useState } from 'react';
import { Play, Pause, RotateCw, Eye } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseVisualProps {
  exercise?: Exercise;
  exerciseId?: string;
  animationType?: string;
  size?: 'sm' | 'md' | 'lg';
  showControls?: boolean;
  className?: string;
}

export const ExerciseVisual: React.FC<ExerciseVisualProps> = ({
  exercise,
  exerciseId,
  animationType,
  size = 'md',
  showControls = true,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<1 | 0.5>(1);

  // Determine animation type based on exercise ID or category
  const targetId = exercise?.id || exerciseId || 'squat';
  const animType = animationType || exercise?.animationType || getAnimTypeFromId(targetId);
  const displayName = exercise?.bengaliName || exercise?.name || targetId.replace(/_/g, ' ');

  const containerSizes = {
    sm: 'w-full h-36',
    md: 'w-full h-52 sm:h-60',
    lg: 'w-full h-64 sm:h-72'
  };

  const animDuration = speed === 1 ? '2.8s' : '5.6s';

  return (
    <div className={`relative flex flex-col items-center justify-center rounded-3xl ios-glass border border-blue-400/25 p-3 overflow-hidden shadow-lg select-none ${containerSizes[size]} ${className}`}>
      {/* Background radial blue glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-blue-950/40 pointer-events-none" />
      <div className="absolute w-40 h-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

      {/* SVG Animation Stage */}
      <div className="relative w-full h-full flex items-center justify-center">
        {renderSvgForAnimation(animType, isPlaying, animDuration)}
      </div>

      {/* Movement Label & Breath indicator */}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] pointer-events-none">
        <span className="px-2 py-0.5 rounded-md bg-blue-950/80 border border-blue-400/30 text-blue-300 font-bold tracking-wider uppercase text-[9px]">
          {displayName}
        </span>

        <span className="px-2 py-0.5 rounded-md bg-blue-900/60 border border-blue-400/20 text-blue-200 text-[10px] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
          <span>{isPlaying ? 'অ্যানিমেশন চলছে' : 'স্থির ফ্রেম'}</span>
        </span>
      </div>

      {/* Subtle Controls overlay if enabled */}
      {showControls && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-10">
          <button
            onClick={() => setSpeed(speed === 1 ? 0.5 : 1)}
            className="px-2 py-1 rounded-xl bg-blue-950/80 hover:bg-blue-900/80 border border-blue-400/20 text-[10px] font-bold text-blue-300 transition-colors"
            title="গতি পরিবর্তন (Slow Motion / Normal)"
          >
            {speed}x
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900/80 border border-blue-400/20 text-blue-300 hover:text-white transition-colors"
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          >
            {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
          </button>
        </div>
      )}
    </div>
  );
};

function getAnimTypeFromId(id: string): string {
  const lower = id.toLowerCase();
  if (lower.includes('squat')) return 'squat';
  if (lower.includes('pushup') || lower.includes('push_up')) {
    if (lower.includes('wall')) return 'wall_pushup';
    if (lower.includes('knee')) return 'knee_pushup';
    return 'pushup';
  }
  if (lower.includes('plank')) return 'plank';
  if (lower.includes('glute') || lower.includes('bridge')) return 'glute_bridge';
  if (lower.includes('cat_cow') || lower.includes('cat')) return 'cat_cow';
  if (lower.includes('bird_dog') || lower.includes('bird')) return 'bird_dog';
  if (lower.includes('dead_bug') || lower.includes('deadbug')) return 'dead_bug';
  if (lower.includes('march') || lower.includes('arm_circles')) return 'marching';
  if (lower.includes('child')) return 'childs_pose';
  if (lower.includes('cobra')) return 'cobra';
  if (lower.includes('jack') || lower.includes('climber') || lower.includes('cardio')) return 'jumping_jack';
  if (lower.includes('superman')) return 'superman';
  return 'stretch';
}

function renderSvgForAnimation(type: string, isPlaying: boolean, duration: string) {
  const playState = isPlaying ? 'running' : 'paused';

  switch (type) {
    case 'squat':
      return (
        <svg viewBox="0 0 200 180" className="w-44 h-40 overflow-visible">
          <defs>
            <style>{`
              @keyframes squatCycle {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(32px); }
              }
              @keyframes kneeBend {
                0%, 100% { d: path("M 80 130 L 78 170"); }
                50% { d: path("M 60 148 L 78 170"); }
              }
              @keyframes armRaise {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-35deg); }
              }
            `}</style>
          </defs>
          {/* Ground surface */}
          <line x1="40" y1="170" x2="160" y2="170" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.5" />
          
          {/* Moving Torso & Head */}
          <g style={{ animation: `squatCycle ${duration} ease-in-out infinite`, animationPlayState: playState }}>
            {/* Head */}
            <circle cx="100" cy="42" r="14" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
            
            {/* Spine / Torso */}
            <line x1="100" y1="56" x2="96" y2="115" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
            
            {/* Arms extending forward for balance */}
            <line x1="100" y1="70" x2="135" y2="78" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" />
            
            {/* Pelvis / Hip hinge */}
            <circle cx="96" cy="115" r="7" fill="#3b82f6" />
          </g>

          {/* Left Leg with animated knee hinge */}
          <line x1="96" y1="115" x2="72" y2="142" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" 
                style={{ animation: `squatCycle ${duration} ease-in-out infinite`, animationPlayState: playState }} />
          <line x1="72" y1="142" x2="78" y2="170" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
          <line x1="78" y1="170" x2="64" y2="170" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />

          {/* Right Leg */}
          <line x1="96" y1="115" x2="120" y2="142" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round"
                style={{ animation: `squatCycle ${duration} ease-in-out infinite`, animationPlayState: playState }} />
          <line x1="120" y1="142" x2="114" y2="170" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
          <line x1="114" y1="170" x2="128" y2="170" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'pushup':
    case 'knee_pushup':
    case 'wall_pushup':
      return (
        <svg viewBox="0 0 240 140" className="w-52 h-36 overflow-visible">
          <defs>
            <style>{`
              @keyframes pushupCycle {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(22px) rotate(3deg); }
              }
              @keyframes elbowBend {
                0%, 100% { transform: scaleY(1); }
                50% { transform: scaleY(0.7); }
              }
            `}</style>
          </defs>
          {/* Mat line */}
          <line x1="20" y1="120" x2="220" y2="120" stroke="#3b82f6" strokeWidth="3" strokeOpacity="0.5" strokeLinecap="round" />
          
          {/* Entire Torso and Head lowering */}
          <g style={{ animation: `pushupCycle ${duration} ease-in-out infinite`, animationPlayState: playState, transformOrigin: '50px 115px' }}>
            {/* Head */}
            <circle cx="180" cy="52" r="12" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
            
            {/* Spine straight board */}
            <line x1="170" y1="62" x2="70" y2="105" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
            
            {/* Upper arm & Forearm pressing */}
            <line x1="160" y1="68" x2="162" y2="100" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
            <line x1="162" y1="100" x2="162" y2="120" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Feet planted firmly */}
          <circle cx="65" cy="115" r="5" fill="#3b82f6" />
          <line x1="65" y1="115" x2="52" y2="120" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'plank':
      return (
        <svg viewBox="0 0 240 140" className="w-52 h-36 overflow-visible">
          <defs>
            <style>{`
              @keyframes plankHold {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-3px); }
              }
              @keyframes corePulse {
                0%, 100% { opacity: 0.3; r: 16; }
                50% { opacity: 0.8; r: 24; }
              }
            `}</style>
          </defs>
          <line x1="20" y1="118" x2="220" y2="118" stroke="#3b82f6" strokeWidth="3" strokeOpacity="0.4" strokeLinecap="round" />
          
          {/* Core Brace Halo */}
          <circle cx="115" cy="78" r="20" fill="#38bdf8" fillOpacity="0.15" style={{ animation: `corePulse ${duration} ease-in-out infinite`, animationPlayState: playState }} />

          <g style={{ animation: `plankHold ${duration} ease-in-out infinite`, animationPlayState: playState }}>
            {/* Head neutral */}
            <circle cx="180" cy="62" r="11" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
            
            {/* Spine straight like iron */}
            <line x1="170" y1="70" x2="60" y2="98" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
            
            {/* Forearm plank support */}
            <line x1="160" y1="74" x2="160" y2="105" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
            <line x1="160" y1="105" x2="182" y2="118" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            
            {/* Toes tucked */}
            <line x1="60" y1="98" x2="52" y2="118" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'glute_bridge':
      return (
        <svg viewBox="0 0 240 140" className="w-52 h-36 overflow-visible">
          <defs>
            <style>{`
              @keyframes bridgeElevate {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-26px); }
              }
            `}</style>
          </defs>
          <line x1="20" y1="120" x2="220" y2="120" stroke="#3b82f6" strokeWidth="3" strokeOpacity="0.4" strokeLinecap="round" />
          
          {/* Head & shoulders pinned */}
          <circle cx="50" cy="110" r="11" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
          <line x1="60" y1="112" x2="80" y2="114" stroke="#93c5fd" strokeWidth="5" strokeLinecap="round" />

          {/* Hips lifting into bridge */}
          <g style={{ animation: `bridgeElevate ${duration} ease-in-out infinite`, animationPlayState: playState }}>
            <circle cx="120" cy="108" r="7" fill="#38bdf8" />
            <line x1="80" y1="114" x2="120" y2="108" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
            <line x1="120" y1="108" x2="160" y2="85" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Knees and Feet planted */}
          <line x1="160" y1="85" x2="175" y2="120" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round"
                style={{ animation: `bridgeElevate ${duration} ease-in-out infinite`, animationPlayState: playState }} />
          <line x1="175" y1="120" x2="190" y2="120" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'cat_cow':
      return (
        <svg viewBox="0 0 220 140" className="w-50 h-36 overflow-visible">
          <defs>
            <style>{`
              @keyframes spineWave {
                0%, 100% { d: path("M 70 80 Q 110 55 150 80"); }
                50% { d: path("M 70 70 Q 110 95 150 70"); }
              }
              @keyframes headWave {
                0%, 100% { transform: translateY(8px); }
                50% { transform: translateY(-8px); }
              }
            `}</style>
          </defs>
          <line x1="30" y1="120" x2="190" y2="120" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          
          {/* Hands & Knees support on floor */}
          <line x1="70" y1="80" x2="70" y2="120" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
          <line x1="150" y1="80" x2="150" y2="120" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />

          {/* Undulating Spine curve (Cat arch vs Cow sway) */}
          <path d="M 70 80 Q 110 55 150 80" fill="none" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round"
                style={{ animation: `spineWave ${duration} ease-in-out infinite`, animationPlayState: playState }} />

          {/* Head moving up and down */}
          <g style={{ animation: `headWave ${duration} ease-in-out infinite`, animationPlayState: playState }}>
            <circle cx="170" cy="70" r="11" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'bird_dog':
      return (
        <svg viewBox="0 0 240 140" className="w-52 h-36 overflow-visible">
          <defs>
            <style>{`
              @keyframes birdDogExtend {
                0%, 100% { transform: scaleX(0.85); }
                50% { transform: scaleX(1.08); }
              }
            `}</style>
          </defs>
          <line x1="20" y1="120" x2="220" y2="120" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          
          {/* Core torso */}
          <line x1="90" y1="75" x2="150" y2="75" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
          
          {/* Supporting hand and knee */}
          <line x1="140" y1="75" x2="140" y2="120" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
          <line x1="100" y1="75" x2="100" y2="120" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
          
          {/* Extending arm and leg */}
          <g style={{ animation: `birdDogExtend ${duration} ease-in-out infinite`, animationPlayState: playState, transformOrigin: '120px 75px' }}>
            <line x1="150" y1="75" x2="210" y2="75" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
            <circle cx="165" cy="65" r="10" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
            <line x1="90" y1="75" x2="30" y2="75" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'dead_bug':
      return (
        <svg viewBox="0 0 220 140" className="w-50 h-36 overflow-visible">
          <defs>
            <style>{`
              @keyframes deadBugReach {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-30deg); }
              }
              @keyframes deadBugLeg {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(25deg); }
              }
            `}</style>
          </defs>
          <line x1="20" y1="110" x2="200" y2="110" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          
          {/* Supine torso on floor */}
          <circle cx="50" cy="100" r="10" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
          <line x1="60" y1="104" x2="130" y2="104" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
          
          {/* Left arm up, Right arm reaching back */}
          <line x1="85" y1="104" x2="85" y2="55" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
          <line x1="85" y1="104" x2="45" y2="70" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round"
                style={{ animation: `deadBugReach ${duration} ease-in-out infinite`, animationPlayState: playState, transformOrigin: '85px 104px' }} />

          {/* Knees bent at 90 degrees */}
          <line x1="130" y1="104" x2="145" y2="65" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
          <line x1="130" y1="104" x2="180" y2="90" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round"
                style={{ animation: `deadBugLeg ${duration} ease-in-out infinite`, animationPlayState: playState, transformOrigin: '130px 104px' }} />
        </svg>
      );

    case 'marching':
      return (
        <svg viewBox="0 0 180 180" className="w-40 h-40 overflow-visible">
          <defs>
            <style>{`
              @keyframes highKnee {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-24px); }
              }
              @keyframes armCircle {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </defs>
          <line x1="30" y1="170" x2="150" y2="170" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          
          {/* Head & Spine */}
          <circle cx="90" cy="40" r="13" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
          <line x1="90" y1="53" x2="90" y2="115" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />

          {/* Rolling Arm Circles */}
          <circle cx="90" cy="68" r="28" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 4"
                  style={{ animation: `armCircle 4s linear infinite`, animationPlayState: playState, transformOrigin: '90px 68px' }} />

          {/* Standing Leg */}
          <line x1="90" y1="115" x2="80" y2="170" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />

          {/* Marching Lifted Knee */}
          <g style={{ animation: `highKnee ${duration} ease-in-out infinite`, animationPlayState: playState }}>
            <line x1="90" y1="115" x2="115" y2="125" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
            <line x1="115" y1="125" x2="115" y2="155" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'childs_pose':
      return (
        <svg viewBox="0 0 220 120" className="w-50 h-32 overflow-visible">
          <defs>
            <style>{`
              @keyframes breathPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.03); }
              }
            `}</style>
          </defs>
          <line x1="20" y1="105" x2="200" y2="105" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          
          {/* Folded body resting forward */}
          <g style={{ animation: `breathPulse ${duration} ease-in-out infinite`, animationPlayState: playState, transformOrigin: '70px 95px' }}>
            {/* Hips on heels */}
            <circle cx="60" cy="92" r="14" fill="#3b82f6" />
            {/* Curved spine */}
            <path d="M 60 92 Q 100 65 140 95" fill="none" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
            {/* Head on floor */}
            <circle cx="150" cy="98" r="9" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
            {/* Arms extended out */}
            <line x1="130" y1="92" x2="185" y2="105" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'jumping_jack':
      return (
        <svg viewBox="0 0 200 180" className="w-44 h-40 overflow-visible">
          <defs>
            <style>{`
              @keyframes jackArms {
                0%, 100% { d: path("M 100 70 L 65 110 M 100 70 L 135 110"); }
                50% { d: path("M 100 70 L 60 30 M 100 70 L 140 30"); }
              }
              @keyframes jackLegs {
                0%, 100% { d: path("M 100 115 L 85 168 M 100 115 L 115 168"); }
                50% { d: path("M 100 115 L 65 168 M 100 115 L 135 168"); }
              }
            `}</style>
          </defs>
          <line x1="30" y1="168" x2="170" y2="168" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          <circle cx="100" cy="40" r="13" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
          <line x1="100" y1="53" x2="100" y2="115" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
          
          <path d="M 100 70 L 65 110 M 100 70 L 135 110" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round"
                style={{ animation: `jackArms ${duration} ease-in-out infinite`, animationPlayState: playState }} />
          <path d="M 100 115 L 85 168 M 100 115 L 115 168" fill="none" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round"
                style={{ animation: `jackLegs ${duration} ease-in-out infinite`, animationPlayState: playState }} />
        </svg>
      );

    default:
      // Generic clean biomechanical posture figure
      return (
        <svg viewBox="0 0 200 180" className="w-44 h-40 overflow-visible">
          <defs>
            <style>{`
              @keyframes pulseGeneral {
                0%, 100% { opacity: 0.8; transform: translateY(0px); }
                50% { opacity: 1; transform: translateY(-4px); }
              }
            `}</style>
          </defs>
          <line x1="40" y1="165" x2="160" y2="165" stroke="#3b82f6" strokeWidth="2" strokeOpacity="0.4" strokeLinecap="round" />
          <g style={{ animation: `pulseGeneral ${duration} ease-in-out infinite`, animationPlayState: playState }}>
            <circle cx="100" cy="45" r="14" fill="#60a5fa" stroke="#93c5fd" strokeWidth="2" />
            <line x1="100" y1="59" x2="100" y2="120" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
            <line x1="100" y1="75" x2="70" y2="100" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <line x1="100" y1="75" x2="130" y2="100" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <line x1="100" y1="120" x2="80" y2="165" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
            <line x1="100" y1="120" x2="120" y2="165" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
          </g>
        </svg>
      );
  }
}
