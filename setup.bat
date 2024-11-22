@echo off
echo Script iniciado...

:: Verificar se o script está sendo executado como administrador
openfiles >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo O script precisa ser executado como administrador.
    echo Por favor, clique com o botão direito e selecione "Executar como administrador".
    pause
    exit /b
)

:: Verificar se o Docker está instalado
echo Verificando se o Docker esta instalado...
where docker >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Docker não está instalado. Baixe e instale o Docker Desktop manualmente: https://www.docker.com/products/docker-desktop
    pause
    exit /b
)
echo Docker esta instalado.

:: Verificar se o WSL está atualizado
echo Verificando se o WSL esta atualizado...
wsl --update >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Atualizando o WSL...
    wsl --update
    echo Atualização concluída. Reinicie o computador para aplicar as mudanças.
    pause
    exit /b
)
echo WSL esta atualizado.

:: Obter o IP do host (IPv4)
echo Obtendo o IP do host...
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /c:"IPv4" ^| findstr /v "127.0.0.1"') do (
    set IP=%%A
)

:: Limpar espaços no IP
set IP=%IP: =%

if "%IP%"=="" (
    echo Não foi possivel obter o IP do host. Verifique sua conexão de rede.
    pause
    exit /b
)
echo IP do host: %IP%

:: Configurar DNS localmente
echo Configurando DNS local...
set HOSTS_FILE=C:\Windows\System32\drivers\etc\hosts

:: Remover qualquer entrada existente para escape-room-page diretamente do arquivo hosts
echo Removendo entradas anteriores para escape-room-page...
powershell -Command "(Get-Content %HOSTS_FILE%) | Where-Object {$_ -notmatch 'escape-room-page'} | Set-Content %HOSTS_FILE%"

:: Adicionar a nova entrada para o IP correto
echo %IP% escape-room-page>> %HOSTS_FILE%
echo Entrada DNS adicionada: escape-room-page -> %IP%

:: Verificar portas no firewall
echo Verificando portas no firewall...

setlocal enabledelayedexpansion
set PORTS=3306 3000 3001

for %%P in (%PORTS%) do (
    netsh advfirewall firewall show rule name="Porta %%P" >nul 2>nul
    if !errorlevel! neq 0 (
        echo Adicionando a porta %%P ao firewall...
        netsh advfirewall firewall add rule name="Porta %%P" dir=in action=allow protocol=TCP localport=%%P >nul
        netsh advfirewall firewall add rule name="Porta %%P" dir=out action=allow protocol=TCP localport=%%P >nul
        echo Porta %%P adicionada.
    ) else (
        echo Porta %%P ja
        
         configurada.
    )
)

docker info >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Docker não esta rodando corretamente. Certifique-se de que o Docker Desktop está em execução.
    pause
    exit /b
)
echo Docker esta funcionando corretamente.

:: Mudar para o diretório onde o arquivo docker-compose.yml está
cd /d "%~dp0"

:: Iniciando os containers
echo Iniciando os containers com Docker Compose...
docker-compose up --build -d

:: Verificar acesso aos containers
echo Acessando o site atraves de http://escape-room-page:3001...
pause
