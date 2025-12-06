@echo off
echo ========================================
echo    SERVER TOEGANGSINFORMATIE
echo ========================================
echo.
echo LOKALE TOEGANG (op deze laptop):
echo   http://localhost:8000/trainer-dashboard.html
echo.
echo NETWERK TOEGANG (voor collega's):
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do (
    set IP=%%a
    set IP=!IP: =!
    echo   http://!IP!:8000/trainer-dashboard.html
)
echo.
echo ========================================
echo.
pause
