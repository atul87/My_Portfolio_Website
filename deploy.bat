@echo off
echo ========================================
echo   DEPLOY TO GITHUB
echo ========================================
echo.

echo Checking git status...
git status
echo.

echo ========================================
echo Ready to deploy?
echo This will:
echo   1. Add all files
echo   2. Commit changes
echo   3. Push to GitHub
echo ========================================
echo.

set /p confirm="Continue? (y/n): "
if /i not "%confirm%"=="y" (
    echo Deployment cancelled.
    pause
    exit /b
)

echo.
echo [1/3] Adding files...
git add .

echo.
echo [2/3] Committing...
git commit -m "Add modern 3D portfolio with 45+ features"

echo.
echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your portfolio is being deployed to:
echo https://github.com/atul87/My_Portfolio_Website
echo.
echo To enable GitHub Pages:
echo 1. Go to repository Settings
echo 2. Click Pages
echo 3. Select main branch
echo 4. Save
echo.
echo Live URL will be:
echo https://atul87.github.io/My_Portfolio_Website/
echo.
echo See DEPLOYMENT_GUIDE.md for more details
echo.
pause
