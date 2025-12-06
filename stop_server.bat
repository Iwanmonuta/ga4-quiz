@echo off
echo Stopping HTTP server on port 8000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do (
    taskkill /F /PID %%a
    echo Server gestopt!
    goto :end
)
echo Geen server gevonden op poort 8000
:end
pause
