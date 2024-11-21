@echo off
echo Verificando se o Docker está instalado...

:: Verificar se o Docker está instalado
where docker >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Docker não está instalado. Baixe e instale o Docker Desktop manualmente: https://www.docker.com/products/docker-desktop
    pause
    exit /b
)

:: Rodar o Docker Compose
echo Iniciando os containers com Docker Compose...
docker-compose up --build
pause
