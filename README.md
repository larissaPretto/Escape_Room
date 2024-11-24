# Escape Room Educacional

Este projeto é um jogo educacional no estilo Escape Room, onde os professores podem personalizar o conteúdo dos desafios para o seu contexto educacional.

### Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- Docker Desktop (https://www.docker.com/products/docker-desktop/).
  - Durante a instalação, não é necessário criar uma conta. Caso seja solicitado, você pode simplesmente pular essa etapa.

## Como rodar o projeto

Para rodar o projeto localmente, siga os passos abaixo:

1- Baixe o Docker Desktop, instale-o e mantenha-o aberto durante toda a execução do projeto.

2- Faça o download do repositório:

- Acesse o repositório do projeto.
- Clique no botão Code, localizado no canto superior direito da página.
- Em seguida, selecione a opção Download ZIP.

3- Extraia o conteúdo do repositório:

- Extraia o arquivo ZIP baixado para uma pasta de sua escolha.
- Navegue até a pasta raiz do projeto, onde estão localizados os arquivos principais.

4- Execute o arquivo de configuração:

- Localize o arquivo setup na pasta raiz do projeto.
- Clique com o botão direito sobre ele e selecione a opção Executar como administrador.
- Atenção: O Microsoft Defender pode exibir uma mensagem de bloqueio, informando que o arquivo veio de uma fonte desconhecida.
  - Caso isso ocorra, clique em Mais Informações e depois em Executar assim mesmo para continuar.

5- Aguarde o processo de configuração:

- O script irá configurar o ambiente, criando as pastas necessárias, gerando os arquivos de configuração e configurando as variáveis de ambiente.
- Em seguida, os containers do Docker serão construídos e iniciados automaticamente.
- Ao final do processo, o sistema estará pronto para uso.

6- Encerrando o sistema:

- Quando desejar desligar o ambiente configurado, execute o arquivo stopSystem, localizado na pasta raiz do projeto.

## Acessando o projeto

- Jogo: Após a configuração, o executável do jogo estará disponível na pasta game. Execute o arquivo EscapeRoomGame para iniciar o jogo;

- Plataforma de personalização: Assim que a configuração for concluída, a plataforma de personalização será aberta automaticamente no seu navegador;

- Acesso em Outros Computadores da Rede:
  - Para permitir que outros computadores da mesma rede acessem o jogo:
    - Jogo: Basta copiar e distribuir a pasta game para os outros computadores. Não é necessário instalar ou configurar o ambiente nesses dispositivos.
    - Plataforma de Personalização: Compartilhe o link gerado pelo computador host. Outros dispositivos na mesma rede poderão acessar a plataforma diretamente através desse link.
  - Observação: Certifique-se de que o ambiente esteja configurado corretamente no computador host antes de distribuir ou compartilhar o acesso.
