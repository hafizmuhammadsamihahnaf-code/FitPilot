# FitPilot — Windows Desktop Fitness Trainer

> A calm, human-feeling daily fitness companion designed for Windows desktop first.
> Offline-first, privacy-focused, with zero mandatory cloud accounts.

---

## 🌟 Overview & Philosophy

FitPilot is designed to feel like a high-craft consumer desktop application:
- **Calm, Human Language**: "Today’s session", "Take a breather", "Nice work", "Ready when you are."
- **Timer as the Visual Hero**: High-contrast, large circular and linear countdown displays with acoustic cues and optional spoken voice prompts.
- **Biomechanical Clarity**: Every exercise includes targeted anatomical purpose, bulleted form cues, easier/scaled variations, and explicit safety/stop notes.
- **Offline & Private**: All profile configurations, workout logs, and optional body metrics are stored locally on your device with complete JSON export/import support.

---

## 🚀 Key Features

1. **Overview Dashboard**:
   - Time-adaptive greeting and daily readiness check.
   - 4-card quick status: Streak, Weekly completion (4 sessions target), Focus pillar, and Recovery reminder.
   - Quick launch for today's recommended foundation workout.

2. **Training Programs & Encyclopedia**:
   - Structured routines: *Today's Foundation*, *Joint Relief & Spine Mobility*, *Core & Posture Alignment*, *Low-Impact Cardio Rhythm*, *Full Body Strength & Control*, and *Evening Reset & Recovery*.
   - Exercise library with category filters (Full body, Mobility, Core, Cardio, Recovery) and search.
   - Detailed modal with form cues, safer variations, and medical comfort notes.

3. **Hero Interval Timer**:
   - Large countdown typography with SVG progress ring.
   - Work / Rest / Prep phase indicators.
   - Web Audio API synthesizer for clean harmonic countdown beeps and completion fanfare.
   - Optional spoken voice cues via Web Speech API.
   - Full keyboard accessibility:
     - `Space`: Play / Pause
     - `Right Arrow`: Next Exercise / Skip
     - `Left Arrow`: Previous Exercise
     - `R`: Reset Phase
     - `M`: Toggle Sound Mute

4. **Progress & Consistency**:
   - Sessions completed, minutes trained, weekly activity bar chart.
   - Historical workout logs with subjective ratings and notes.
   - Private optional body check-in metrics (Weight, Waist, Chest).
   - Zero-shaming, evidence-based coaching tips.

5. **Monthly Rhythm Calendar**:
   - Interactive calendar with green completion badges and day inspector drawer.

6. **Personalization & Safety**:
   - User profile customization (Experience level, Available daily time, Equipment inventory, Goals).
   - Strict medical safety disclaimers and immediate "Feeling Unwell" stop button.

---

## 📦 Windows Native Desktop Packaging (.EXE)

FitPilot provides two ways to run on Windows:

### 1. Web & Desktop Wrapper (React + Vite)
```bash
npm run build
npm run preview
```

### 2. Standalone Windows Desktop Executable (PySide6 / Qt)
Included in the repository is `FitPilot_desktop.py` and `build_windows.bat`:

```bash
# 1. Install Python requirements
pip install -r requirements.txt

# 2. Build single-file Windows .exe
pyinstaller --onefile --noconsole --name "FitPilot" FitPilot_desktop.py

# Output executable will be generated at:
dist/FitPilot.exe
```

Or simply double-click `build_windows.bat` on any Windows PC with Python installed!

---

## 🛡️ Medical Safety & Evidence Rules
- FitPilot does not diagnose medical conditions.
- If you experience pain, dizziness, chest tightness, fainting, or acute shortness of breath, stop and seek prompt medical attention.
- Spot reduction of body fat is physiologically impossible; overall energy balance and consistent activity build lifelong health.
