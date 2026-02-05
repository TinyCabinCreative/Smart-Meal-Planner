@echo off
echo ========================================
echo Smart Meal Planner - Fresh Installation
echo ========================================
echo.

echo Step 1: Cleaning old files...
if exist node_modules rmdir /s /q node_modules
if exist .nuxt rmdir /s /q .nuxt
if exist .output rmdir /s /q .output
if exist package-lock.json del package-lock.json
echo Done!
echo.

echo Step 2: Installing dependencies...
call npm install
echo Done!
echo.

echo Step 3: Preparing Nuxt...
call npx nuxi prepare
echo Done!
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
pause
