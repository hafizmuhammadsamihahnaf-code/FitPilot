@echo off
echo ========================================================
echo FitPilot - Windows Native Desktop Application Builder
echo ========================================================
echo.

echo [1/3] Checking Python installation...
python --version
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH.
    pause
    exit /b 1
)

echo.
echo [2/3] Installing PySide6 and PyInstaller dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing dependencies.
    pause
    exit /b 1
)

echo.
echo [3/3] Compiling standalone Windows executable (.exe)...
pyinstaller --onefile --noconsole --name "FitPilot" FitPilot_desktop.py
if %errorlevel% neq 0 (
    echo Compilation failed.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo Build Successful!
echo Standalone executable is located at: dist\FitPilot.exe
echo ========================================================
pause
