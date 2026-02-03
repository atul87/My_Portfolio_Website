@echo off
echo ========================================
echo   ATUL PORTFOLIO - QUICK START
echo ========================================
echo.

echo [1/3] Checking dependencies...
pip show flask >nul 2>&1
if errorlevel 1 (
    echo Installing Flask...
    pip install -r requirements.txt
)

echo.
echo [2/3] Starting Flask server...
echo Server will run on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

start /B python app.py

timeout /t 3 /nobreak >nul

echo.
echo [3/3] Opening browser...
start http://localhost:5000

echo.
echo ========================================
echo   SERVER IS RUNNING!
echo ========================================
echo.
echo FEATURES TO TEST:
echo   - Press Ctrl+K for command palette
echo   - Click theme buttons (right side)
echo   - Click FAB menu (plus button)
echo   - Hover over cards for 3D effects
echo   - Move mouse for spotlight
echo   - Check console (F12) for logs
echo.
echo See TESTING_GUIDE.md for full test list
echo.
echo Press any key to stop server...
pause >nul

taskkill /F /IM python.exe /FI "WINDOWTITLE eq *app.py*" >nul 2>&1
echo Server stopped.
