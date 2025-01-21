@echo off
IF "%1"=="" (
    echo Please specify environment: prod or test
    echo Usage: deploy.bat [prod^|test]
    exit /b 1
)

where gcloud >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Error: Google Cloud SDK is not installed
    echo Please install gcloud CLI: https://cloud.google.com/sdk/docs/install
    exit /b 1
)

"C:\Program Files\Git\bin\sh.exe" "%~dp0deploy.sh" %1
IF %ERRORLEVEL% NEQ 0 (
    echo Deployment failed!
    exit /b 1
) 