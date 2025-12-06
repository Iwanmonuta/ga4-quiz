@echo off
setlocal enabledelayedexpansion

REM Get IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do (
    set IP=%%a
    set IP=!IP: =!
    goto :found_ip
)
:found_ip

echo ========================================
echo    GA4 Quiz - Lokale Netwerk Server
echo ========================================
echo.
echo Starting HTTP server...
echo.
echo ========================================
echo    Server is LIVE!
echo ========================================
echo.
echo Trainer Dashboard:
echo   http://localhost:8000/trainer-dashboard.html
echo   http://!IP!:8000/trainer-dashboard.html
echo.
echo Quiz URLs om te delen met deelnemers:
echo.
echo PRE-TEST:
echo   http://!IP!:8000/quiz-session.html?session=pre
echo.
echo POST-TEST:
echo   http://!IP!:8000/quiz-session.html?session=post
echo.
echo ========================================
echo Druk op CTRL+C om te stoppen
echo ========================================
echo.
python -m http.server 8000
