/**
 * Unit Tests for FitPilot Timer Engine Logic
 */

export function calculateClockDisplay(seconds: number): string {
  const m = Math.floor(Math.max(0, seconds) / 60);
  const s = Math.max(0, seconds) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function computeNextPhase(
  currentPhase: 'prep' | 'work' | 'rest',
  currentIndex: number,
  totalExercises: number,
  workSeconds: number,
  restSeconds: number
): { nextPhase: 'prep' | 'work' | 'rest' | 'completed'; nextIndex: number; duration: number } {
  if (currentPhase === 'prep') {
    return { nextPhase: 'work', nextIndex: currentIndex, duration: workSeconds };
  }

  if (currentPhase === 'work') {
    const isLast = currentIndex >= totalExercises - 1;
    if (isLast) {
      return { nextPhase: 'completed', nextIndex: currentIndex, duration: 0 };
    }
    if (restSeconds > 0) {
      return { nextPhase: 'rest', nextIndex: currentIndex, duration: restSeconds };
    } else {
      return { nextPhase: 'work', nextIndex: currentIndex + 1, duration: workSeconds };
    }
  }

  // currentPhase === 'rest'
  const nextIdx = currentIndex + 1;
  if (nextIdx >= totalExercises) {
    return { nextPhase: 'completed', nextIndex: currentIndex, duration: 0 };
  }
  return { nextPhase: 'work', nextIndex: nextIdx, duration: workSeconds };
}

// Simple test assertions
export function runTimerLogicTests(): boolean {
  // Test 1: Clock formatting
  console.assert(calculateClockDisplay(60) === '01:00', '60 seconds should be 01:00');
  console.assert(calculateClockDisplay(5) === '00:05', '5 seconds should be 00:05');
  console.assert(calculateClockDisplay(125) === '02:05', '125 seconds should be 02:05');

  // Test 2: Prep to Work transition
  const step1 = computeNextPhase('prep', 0, 5, 45, 15);
  console.assert(step1.nextPhase === 'work' && step1.duration === 45, 'Prep transitions to Work');

  // Test 3: Work to Rest transition
  const step2 = computeNextPhase('work', 0, 5, 45, 15);
  console.assert(step2.nextPhase === 'rest' && step2.duration === 15, 'Work transitions to Rest');

  // Test 4: Rest to Next Work transition
  const step3 = computeNextPhase('rest', 0, 5, 50, 15);
  console.assert(step3.nextPhase === 'work' && step3.nextIndex === 1, 'Rest transitions to next exercise');

  // Test 5: Final exercise work completion
  const stepFinal = computeNextPhase('work', 4, 5, 45, 15);
  console.assert(stepFinal.nextPhase === 'completed', 'Last exercise transitions to completed');

  return true;
}
