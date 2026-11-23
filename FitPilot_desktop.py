"""
FitPilot - Windows Desktop Fitness Trainer App
Native PySide6 Implementation for Windows Desktop
"""

import sys
from PySide6.QtCore import Qt, QTimer
from PySide6.QtWidgets import (
    QApplication, QWidget, QMainWindow, QLabel, QPushButton, QVBoxLayout,
    QHBoxLayout, QGridLayout, QFrame, QStackedWidget, QListWidget,
    QListWidgetItem, QProgressBar, QSpinBox, QMessageBox, QScrollArea
)

APP_NAME = "FitPilot"

WORKOUTS = [
    ("Warm-up March", "Controlled pace, elevate body temperature and lubricate joints", 60),
    ("Controlled Bodyweight Squat", "Full depth, knees tracking over second toe", 50),
    ("Incline Push-up", "Elevated hands on desk/wall, straight plank", 45),
    ("Floor Glute Bridge", "Slow glute contraction at peak for 2s", 45),
    ("Bird Dog Reach", "Diagonal stability and anti-rotation reach", 50),
    ("Dead Bug Core", "Lumbar spine pressed flat into mat", 50),
    ("Restorative Child's Pose", "Deep diaphragmatic breathing and decompression", 60),
]

class Card(QFrame):
    def __init__(self, title="", subtitle="", parent=None):
        super().__init__(parent)
        self.setObjectName("Card")
        lay = QVBoxLayout(self)
        lay.setContentsMargins(20, 18, 20, 18)
        lay.setSpacing(7)
        self.title = QLabel(title)
        self.title.setObjectName("CardTitle")
        self.subtitle = QLabel(subtitle)
        self.subtitle.setObjectName("Muted")
        self.subtitle.setWordWrap(True)
        lay.addWidget(self.title)
        lay.addWidget(self.subtitle)

class TimerPage(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.remaining = 60
        self.running = False
        self.current_idx = 0
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.tick)

        root = QVBoxLayout(self)
        root.setContentsMargins(30, 25, 30, 30)
        root.setSpacing(18)

        head = QHBoxLayout()
        title = QLabel("Session Interval Timer")
        title.setObjectName("PageTitle")
        head.addWidget(title)
        head.addStretch()
        root.addLayout(head)

        self.phase_badge = QLabel("WORK • CONTROLLED TEMPO")
        self.phase_badge.setObjectName("Badge")
        self.phase_badge.setAlignment(Qt.AlignCenter)
        root.addWidget(self.phase_badge)

        self.exercise = QLabel("Ready")
        self.exercise.setObjectName("HeroLabel")
        self.exercise.setAlignment(Qt.AlignCenter)

        self.clock = QLabel("01:00")
        self.clock.setObjectName("TimerLabel")
        self.clock.setAlignment(Qt.AlignCenter)

        self.bar = QProgressBar()
        self.bar.setTextVisible(False)
        self.bar.setValue(0)

        root.addWidget(self.exercise)
        root.addWidget(self.clock)
        root.addWidget(self.bar)

        controls = QHBoxLayout()
        self.start = QPushButton("Start Session")
        self.start.setObjectName("Primary")
        self.start.clicked.connect(self.toggle)
        skip = QPushButton("Next Exercise")
        skip.clicked.connect(self.skip_next)
        reset = QPushButton("Reset Phase")
        reset.clicked.connect(self.reset)
        controls.addWidget(self.start)
        controls.addWidget(skip)
        controls.addWidget(reset)
        root.addLayout(controls)

        self.next_label = QLabel("Next: Controlled Bodyweight Squat")
        self.next_label.setObjectName("Muted")
        root.addWidget(self.next_label)

    def set_exercise(self, name, seconds, next_name="—"):
        self.exercise.setText(name)
        self.remaining = seconds
        self.bar.setMaximum(seconds)
        self.bar.setValue(0)
        self.next_label.setText(f"Next: {next_name}")
        self.update_clock()

    def update_clock(self):
        m, s = divmod(max(0, self.remaining), 60)
        self.clock.setText(f"{m:02d}:{s:02d}")

    def toggle(self):
        if self.running:
            self.timer.stop()
            self.running = False
            self.start.setText("Resume")
        else:
            self.timer.start(1000)
            self.running = True
            self.start.setText("Pause")

    def tick(self):
        self.remaining -= 1
        self.bar.setValue(self.bar.maximum() - max(0, self.remaining))
        self.update_clock()
        if self.remaining <= 0:
            self.skip_next()
            QApplication.beep()

    def skip_next(self):
        self.current_idx = (self.current_idx + 1) % len(WORKOUTS)
        name, desc, secs = WORKOUTS[self.current_idx]
        next_name = WORKOUTS[(self.current_idx + 1) % len(WORKOUTS)][0]
        self.set_exercise(name, secs, next_name)

    def reset(self):
        self.timer.stop()
        self.running = False
        self.start.setText("Start Session")
        self.remaining = self.bar.maximum() or 60
        self.update_clock()

class Dashboard(QWidget):
    def __init__(self, go_timer, parent=None):
        super().__init__(parent)
        root = QVBoxLayout(self)
        root.setContentsMargins(30, 25, 30, 30)
        root.setSpacing(18)

        title = QLabel("Good day.")
        title.setObjectName("PageTitle")
        sub = QLabel("Your goal today is consistency, not perfection. Ready when you are.")
        sub.setObjectName("Muted")
        root.addWidget(title)
        root.addWidget(sub)

        grid = QGridLayout()
        grid.setSpacing(14)
        grid.addWidget(Card("Today's Readiness", "Full-body foundation • ~28 min"), 0, 0)
        grid.addWidget(Card("Streak", "3 days • continuous rhythm"), 0, 1)
        grid.addWidget(Card("Core Focus", "Mobility + core alignment"), 1, 0)
        grid.addWidget(Card("Recovery Cue", "Sleep 7-8h, hydration, gentle walking"), 1, 1)
        root.addLayout(grid)

        session = Card("Today's Session", "A joint-friendly sequence. Adjust intensity to your comfort.")
        btn = QPushButton("Start session")
        btn.setObjectName("Primary")
        btn.clicked.connect(go_timer)
        session.layout().addWidget(btn)
        root.addWidget(session)
        root.addStretch()

class PlanPage(QWidget):
    def __init__(self, go_timer, parent=None):
        super().__init__(parent)
        scroll = QScrollArea(self)
        scroll.setWidgetResizable(True)
        container = QWidget()
        root = QVBoxLayout(container)
        root.setContentsMargins(30, 25, 30, 30)
        root.setSpacing(16)

        title = QLabel("Training Program")
        title.setObjectName("PageTitle")
        root.addWidget(title)
        root.addWidget(QLabel("Structured movements with biomechanical form cues.", objectName="Muted"))

        for i, (name, desc, secs) in enumerate(WORKOUTS):
            c = Card(f"{i+1}. {name}", f"{desc} • {secs}s interval")
            root.addWidget(c)
        root.addStretch()
        scroll.setWidget(container)

        lay = QVBoxLayout(self)
        lay.setContentsMargins(0, 0, 0, 0)
        lay.addWidget(scroll)

class ProfilePage(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        root = QVBoxLayout(self)
        root.setContentsMargins(30, 25, 30, 30)
        root.setSpacing(16)

        title = QLabel("Profile & Safety Guidelines")
        title.setObjectName("PageTitle")
        root.addWidget(title)

        c = Card("Personal Setup", "Values stored locally on this machine.")
        form = QGridLayout()
        form.addWidget(QLabel("Age"), 0, 0)
        age = QSpinBox()
        age.setRange(13, 100)
        age.setValue(25)
        form.addWidget(age, 0, 1)

        form.addWidget(QLabel("Daily Target (minutes)"), 1, 0)
        mins = QSpinBox()
        mins.setRange(10, 120)
        mins.setValue(30)
        form.addWidget(mins, 1, 1)
        c.layout().addLayout(form)
        root.addWidget(c)

        note = Card(
            "Medical Safety Protocol",
            "FitPilot is not a physician. Pain, dizziness, chest pressure, unusual shortness of breath, "
            "or acute injury are reasons to stop immediately and seek medical evaluation. Spot reduction of fat is physiologically impossible; "
            "consistent weekly energy balance and daily movement drive lifelong health."
        )
        root.addWidget(note)
        root.addStretch()

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle(APP_NAME + " - Windows Desktop Fitness Trainer")
        self.resize(1120, 720)

        central = QWidget()
        self.setCentralWidget(central)
        layout = QHBoxLayout(central)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)

        nav = QFrame()
        nav.setObjectName("Sidebar")
        nav.setFixedWidth(230)
        nlay = QVBoxLayout(nav)
        nlay.setContentsMargins(18, 22, 18, 22)

        brand = QLabel(APP_NAME)
        brand.setObjectName("Brand")
        nlay.addWidget(brand)
        nlay.addWidget(QLabel("Windows Desktop Companion", objectName="Muted"))
        nlay.addSpacing(18)

        self.list = QListWidget()
        for name in ["Overview", "Training", "Timer", "Profile"]:
            QListWidgetItem(name, self.list)
        self.list.currentRowChanged.connect(self.change_page)
        nlay.addWidget(self.list)
        nlay.addStretch()
        nlay.addWidget(QLabel("Offline • 100% Private", objectName="Muted"))
        layout.addWidget(nav)

        self.stack = QStackedWidget()
        self.timer_page = TimerPage()
        self.stack.addWidget(Dashboard(self.open_timer))
        self.stack.addWidget(PlanPage(self.open_timer))
        self.stack.addWidget(self.timer_page)
        self.stack.addWidget(ProfilePage())
        layout.addWidget(self.stack, 1)
        self.list.setCurrentRow(0)

    def change_page(self, row):
        self.stack.setCurrentIndex(row)

    def open_timer(self):
        self.list.setCurrentRow(2)
        name, desc, secs = WORKOUTS[0]
        next_name = WORKOUTS[1][0]
        self.timer_page.set_exercise(name, secs, next_name)

def main():
    app = QApplication(sys.argv)
    app.setStyle("Fusion")
    app.setStyleSheet("""
        QWidget { background:#0d1117; color:#eef2f7; font-family:"Segoe UI", "Segoe UI Variable Text", sans-serif; font-size:14px; }
        #Sidebar { background:#11161e; border-right:1px solid #242b35; }
        #Brand { font-size:24px; font-weight:700; padding:2px 0px; }
        #Card { background:#151b24; border:1px solid #252e39; border-radius:16px; }
        #CardTitle { font-size:17px; font-weight:650; }
        #PageTitle { font-size:30px; font-weight:700; }
        #HeroLabel { font-size:26px; font-weight:650; margin-top:14px; }
        #TimerLabel { font-size:86px; font-weight:700; letter-spacing:2px; }
        #Badge { font-size:11px; font-weight:700; color:#34d399; background:#052e16; border:1px solid #065f46; border-radius:12px; padding:4px 12px; }
        #Muted { color:#8f9baa; font-size:12px; }
        QListWidget { background:transparent; border:0; outline:0; }
        QListWidget::item { padding:13px 12px; border-radius:10px; margin:3px 0; }
        QListWidget::item:selected { background:#202936; color:#ffffff; font-weight:600; }
        QPushButton { background:#202936; border:1px solid #303b49; border-radius:10px; padding:11px 18px; font-weight:600; }
        QPushButton:hover { background:#283342; }
        QPushButton#Primary { background:#e9eef5; color:#10151c; border:0; font-weight:700; }
        QPushButton#Primary:hover { background:#ffffff; }
        QProgressBar { height:8px; border:0; border-radius:4px; background:#222a34; }
        QProgressBar::chunk { background:#34d399; border-radius:4px; }
        QSpinBox { background:#151b24; border:1px solid #303b49; border-radius:8px; padding:8px; }
    """)
    w = MainWindow()
    w.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
