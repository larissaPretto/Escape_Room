@echo off
echo Script iniciado...

:: Verificar se o script est� sendo executado como administrador
openfiles >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo O script precisa ser executado como administrador.
    echo Por favor, clique com o bot�o direito e selecione "Executar como administrador".
    pause
    exit /b
)

:: Verificar se o Docker est� instalado
echo Verificando se o Docker esta instalado...
where docker >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Docker n�o est� instalado. Baixe e instale o Docker Desktop manualmente: https://www.docker.com/products/docker-desktop
    pause
    exit /b
)
echo Docker esta instalado.

:: Verificar se o WSL est� atualizado
echo Verificando se o WSL esta atualizado...
wsl --update >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Atualizando o WSL...
    wsl --update
    echo Atualiza��o conclu�da. Reinicie o computador para aplicar as mudan�as.
    pause
    exit /b
)
echo WSL esta atualizado.

:: Obter o primeiro IPv4 v�lido
echo Obtendo o primeiro endere�o IPv4...
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr "Endere�o IPv4"') do (
    set IP=%%A
    goto :break_loop
)
:break_loop

:: Remover espa�os adicionais
set IP=%IP: =%
if "%IP%"=="" (
    echo N�o foi poss�vel obter o IP do host. Verifique sua conex�o de rede.
    pause
    exit /b
)
echo IP do host: %IP%

:: Verificar portas no firewall
echo Verificando portas no firewall...
setlocal enabledelayedexpansion
set PORTS=3306 33060 3000 3001

for %%P in (%PORTS%) do (
    netsh advfirewall firewall show rule name="Porta %%P" >nul 2>nul
    if !errorlevel! neq 0 (
        echo Adicionando a porta %%P ao firewall...
        netsh advfirewall firewall add rule name="Porta %%P" dir=in action=allow protocol=TCP localport=%%P >nul
        netsh advfirewall firewall add rule name="Porta %%P" dir=out action=allow protocol=TCP localport=%%P >nul
        echo Porta %%P adicionada.
    ) else (
        echo Porta %%P ja configurada.
    )
)

docker info >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Docker n�o esta rodando corretamente. Certifique-se de que o Docker Desktop est� em execu��o.
    pause
    exit /b
)
echo Docker esta funcionando corretamente.

:: Mudar para o diret�rio onde o arquivo docker-compose.yml est�
cd /d "%~dp0"

:: API_URL para o backend
cd api-escape
echo. >> .env 
echo API_URL=http://%IP% >> .env
cd ..

:: Para o Frontend (site), se necessário
cd site_escape
echo. >> .env 
echo REACT_APP_API_URL=http://%IP%:3000 >> .env
cd ..

:: Iniciando os containers
echo Iniciando os containers com Docker Compose...
docker-compose up --build -d

:: Exibir link para o usu�rio
set URL=http://%IP%:3001
echo Acesse o site em: %URL%

:: Abrir o site no navegador padr�o
start %URL%

pause
