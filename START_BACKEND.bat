@echo off
cd /d "%~dp0backend"
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot
echo Starting Employee Backend on http://localhost:8081
echo.
echo IMPORTANT: Keep this window open!
echo Backend will run until you close this window.
echo.
mvn spring-boot:run
pause
