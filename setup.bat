@echo off

:: Verificar se o Docker está instalado
echo Verificando se o Docker está instalado...
where docker >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Docker não está instalado. Baixe e instale o Docker Desktop manualmente: https://www.docker.com/products/docker-desktop
    pause
    exit /b
)

:: Verificar se o WSL está instalado
echo Verificando se o WSL está instalado...
where wsl >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo WSL não está instalado. Instale o WSL usando o seguinte comando no PowerShell (como administrador):
    echo wsl --install
    pause
    exit /b
)

:: Verificar se o WSL está atualizado
echo Verificando se o WSL está atualizado...
wsl --update >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Atualizando o WSL...
    wsl --update
    echo Atualização concluída. Reinicie o computador para aplicar as mudanças.
    pause
    exit /b
)

:: Rodar o Docker Compose
echo Iniciando os containers com Docker Compose...
docker-compose up --build
pause