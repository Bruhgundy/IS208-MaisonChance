@echo off
title Maison Chance Digital
echo ============================================
echo  Maison Chance Digital - Quick Start
echo ============================================
echo.

:: Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed or not running.
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop/
    echo.
    pause
    exit /b 1
)

echo [1/3] Building Docker image...
docker build -t maison-chance .
if %errorlevel% neq 0 (
    echo [ERROR] Build failed.
    pause
    exit /b 1
)

echo [2/3] Stopping any old container...
docker stop maison-chance >nul 2>&1
docker rm maison-chance >nul 2>&1

echo [3/3] Starting app on http://localhost:8080 ...
docker run -d -p 8080:80 --name maison-chance maison-chance

echo.
echo ============================================
echo  App is running at: http://localhost:8080
echo ============================================
echo.
echo  To stop:  docker stop maison-chance
echo  To start again:  docker start maison-chance
echo  To remove:  docker rm maison-chance
echo.
start http://localhost:8080
