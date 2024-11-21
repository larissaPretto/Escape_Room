-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: escape
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artifact`
--

DROP TABLE IF EXISTS `artifact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artifact` (
  `idArtifact` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`idArtifact`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artifact`
--

LOCK TABLES `artifact` WRITE;
/*!40000 ALTER TABLE `artifact` DISABLE KEYS */;
INSERT INTO `artifact` VALUES (1,'Dica do computador','dica_escritorio.png'),(2,'Documento V/ F','vf_escritorio.png'),(3,'Livro página esquerda','bookl_escritorio.png'),(4,'Livro página direita','bookr_escritorio.png'),(5,'Papel Verde','paperGreen_escritorio.png'),(6,'Papel Vermelho','paperRed_escritorio.png'),(7,'Papel Amarelo','paperYellow_escritorio.png'),(8,'Papel Azul','paperBlue_escritorio.png');
/*!40000 ALTER TABLE `artifact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `idContent` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`idContent`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (1,'nucleo'),(2,'fs'),(3,'bb');
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `idGame` int NOT NULL AUTO_INCREMENT,
  `win` tinyint NOT NULL DEFAULT '0',
  `timeEnd` time NOT NULL DEFAULT '00:00:00',
  `dataGame` timestamp NOT NULL,
  `idRoom` int DEFAULT NULL,
  `idPlayer` int DEFAULT NULL,
  PRIMARY KEY (`idGame`),
  KEY `FK_2059ea5089969a6ae1a083f2e37` (`idRoom`),
  KEY `FK_c42f9ca347d2be17c0c38a6b89d` (`idPlayer`),
  CONSTRAINT `FK_2059ea5089969a6ae1a083f2e37` FOREIGN KEY (`idRoom`) REFERENCES `room` (`idRoom`),
  CONSTRAINT `FK_c42f9ca347d2be17c0c38a6b89d` FOREIGN KEY (`idPlayer`) REFERENCES `player` (`idPlayer`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,0,'00:00:00','2024-11-18 00:25:38',9,1),(2,0,'00:00:00','2024-11-18 00:28:20',3,1),(3,0,'00:00:00','2024-11-18 00:31:27',3,1),(4,0,'00:00:00','2024-11-18 00:32:32',3,1),(5,0,'00:00:00','2024-11-18 00:33:50',4,2),(6,0,'00:00:00','2024-11-18 00:47:42',6,1),(7,0,'00:00:00','2024-11-18 01:19:35',20,12),(8,0,'00:00:00','2024-11-18 01:22:15',13,13),(9,0,'00:00:00','2024-11-18 03:16:48',12,14),(10,0,'00:00:00','2024-11-18 03:21:57',12,16),(11,0,'00:00:00','2024-11-18 03:22:55',12,17),(12,0,'00:00:00','2024-11-19 04:31:41',12,20),(13,0,'00:00:00','2024-11-20 08:31:53',13,27),(14,0,'00:00:00','2024-11-21 05:33:34',13,28),(15,0,'00:00:00','2024-11-21 05:57:04',13,29),(16,0,'00:00:00','2024-11-21 05:57:15',13,29),(17,0,'00:00:00','2024-11-21 06:14:48',13,31);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `idPlayer` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`idPlayer`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'player1'),(2,'plasyer1'),(3,'wds'),(4,'gh'),(5,'testes'),(6,'assa'),(7,'asdawd'),(8,'sefsdf'),(9,'xxxx'),(10,'aaaaaaaaa'),(11,'asasas'),(12,'asdwads'),(13,'1234s'),(14,'dawdasd'),(15,'fesfs'),(16,'d'),(17,'s'),(18,'dfgdgr'),(19,'dad'),(20,'dwadasd'),(21,'dwads'),(22,'dadasd'),(23,'ad'),(24,'dads'),(25,'ae'),(26,'awds'),(27,'bgfb'),(28,'oi'),(29,'larissa'),(30,'larissa2'),(31,'lari');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puzzle`
--

DROP TABLE IF EXISTS `puzzle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puzzle` (
  `idPuzzle` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`idPuzzle`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puzzle`
--

LOCK TABLES `puzzle` WRITE;
/*!40000 ALTER TABLE `puzzle` DISABLE KEYS */;
INSERT INTO `puzzle` VALUES (1,'Computador','O jogador precisa desbloquear o computador para encontrar um dos papéis que contém parte do código final. Mas, antes de acessar o computador, o jogador deve resolver dois passos.<li><strong>Passo 1 - Ligar o Roteador:</strong> <p>O roteador está desconectado da tomada, e o jogador precisa ligá-lo para ter acesso à internet. </p> </li> <li><strong>Passo 2 - Descobrir a Senha:</strong> <p><strong> - Dica:</strong> Deve-se criar uma questão cuja resposta será a senha do computador.</p> <p><span><em>Exemplo:</em> \"Qual é o polígono de cinco lados?\". A<strong> resposta do enigma</strong> será: Pentágono.</p></span></li> Ao acertar, o computador será desbloqueado e o jogador encontrará uma imagem do papel vermelho.','pc_escritorio.png'),(2,'Baú','O jogador precisa abrir um baú trancado com um cadeado de combinação. Para desbloquear o baú, ele deverá analisar uma folha com afirmativas verdadeiras e falsas e contar quantas são verdadeiras (V) e quantas são falsas (F). Preso ao lado do baú, há um post-it que indica a ordem correta para inserir no cadeado: V, F, V, F. <li><strong>Passo 1 - Analisar a Folha:</strong>\n      <p>O jogador deve verificar as afirmativas na folha e contar quantas delas são verdadeiras (V) e quantas são falsas (F).</p>\n      <p><strong> - Documento V/ F:</strong> O professor deve criar uma série de afirmativas de verdadeiro ou falso.</p>\n      <p><span><em>Exemplo:</em> Afirmativa 1: \"A soma dos ângulos internos de um triângulo é 180 graus.\" (V). Afirmativa 2: \"Um quadrado tem três lados.\" (F). O jogador deve contar o total de afirmativas verdadeiras e falsas.</span></p>\n    </li>\n\n    <li><strong>Passo 2 - Seguir a Ordem:</strong>\n      <p>Ao lado do baú, o jogador verá um post-it com a sequência: V, F, V, F. Ele deve usar a quantidade de respostas verdadeiras e falsas conforme essa ordem para abrir o cadeado.</p>\n      <p><span><em>Exemplo:</em> Se houver 3 afirmativas verdadeiras e 2 falsas, a <strong> resposta do enigma </strong> será 3232, seguindo a ordem do post-it.</span></p>\n    </li>\n\n  Ao inserir o código correto no cadeado, o baú se abrirá, revelando o papel azul e uma chave.','bau_escritorio.png'),(3,'Cofre','Após abrir o baú, o jogador encontra uma chave. Essa chave abrirá as portas de um armário, revelando um cofre. Para abrir o cofre, o jogador precisará resolver questões encontradas em um caderno. A senha do cofre é composta por 9 símbolos especiais, e as respostas do caderno devem ser traduzidas para esses símbolos.\n\n<li><strong>Passo 1 - Resolver as Questões:</strong>\n      <p>O jogador deve responder as perguntas no caderno para encontrar números e/ou letras. Essas respostas serão utilizadas para formar a senha do cofre.</p>\n      <p><strong> - Livro página esquerda e direita:</strong> Deve-se criar perguntas cujas respostas sejam números e/ou letras. Pode usar as duas páginas do caderno para as questões.</p>\n      <p><span><em>Exemplo:</em> \"Quanto é 2 + 2?\" Resposta: 4. \"Qual a primeira letra da palavra \'Círculo\'?\" Resposta: C.</span></p>\n    </li>\n<li><strong>Passo 2 - Traduzir para Símbolos:</strong>\n      <p>Virando a página do caderno, o jogador encontra uma tabela que traduz números e letras para símbolos. Usando essa tabela, ele deve converter as respostas das questões para os símbolos correspondentes.</p>\n      <p><strong>Tabela de Tradução:</strong></p>\n      <ul>\n        <li>1 -> ε</li>\n        <li>2 -> α</li>\n        <li>3 -> β</li>\n        <li>4 -> γ</li>\n        <li>5 -> δ</li>\n        <li>6 -> θ</li>\n        <li>7 -> φ</li>\n        <li>8 -> ψ</li>\n        <li>9 -> ω</li>\n                <li>A, B, C -> ε</li>\n        <li>D, E, F -> α</li>\n        <li>G, H, I -> β</li>\n        <li>J, K, L -> γ</li>\n        <li>M, N, O -> δ</li>\n        <li>P, Q, R -> θ</li>\n        <li>S, T, U -> φ</li>\n        <li>V, W, X -> ψ</li>\n        <li>Y, Z -> ω</li>\n      </ul>\n\n      <p><span><em>Exemplo:</em> Se a resposta for \"4\" e \"C\", a tradução seria: 4 -> γ e C -> ε. Assim, parte da <strong> resposta do enigma </strong> seria \'γε\'. <strong> Mas no campo de resposta abaixo, insira os valores como números (por exemplo, 41)</strong></span></p>\n    </li>\n\nAo inserir a senha correta composta pelos símbolos, o cofre será aberto e o jogador encontrará o papel verde.','cofre_escritorio.png'),(4,'Keypad','<p>O jogador precisa usar o keypad para fugir, mas antes disso deve ter encontrado os quatro papéis coloridos, com três deles sendo obtidos ao resolver os enigmas anteriores, e o papel amarelo estará escondido em algum ponto do cenário.</p>\n<ul>\n  <li>\n    <strong>Passo 1 - Encontrar os Papéis: </strong>\n<p><strong> - Papéis:</strong> As respostas das questões nos papéis devem resultar em números. </p>\n<p><span><em>Exemplo:</em> Pergunta do papel verde: Qual das alternativas é um número primo? 1) 12;  2) 17; 3) 20; A resposta desse papel seria 2.</span></p>\n<p><span> Pergunta do papel vermelho: Quanto é 5 x 7 ? A resposta desse papel seria 35.</span></p>\n<p><span>Portando a<strong> resposta do enigma </strong> iria começar com 235.</span></p>\n  </li> \n  <li>\n    <strong>Passo 2 - Descobrir a Ordem:</strong>\n    <p>A ordem correta dos números é determinada pelas cores dos papéis, que estará indicada em um papel encontrado no lixo. A ordem correta é: Verde, Vermelho, Amarelo e Azul. O jogador deve inserir os números na sequência correta.</p>\n  </li>\n</ul>','keypad_escritorio.png');
/*!40000 ALTER TABLE `puzzle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puzzle_artifact`
--

DROP TABLE IF EXISTS `puzzle_artifact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puzzle_artifact` (
  `idPuzzleArtifact` int NOT NULL AUTO_INCREMENT,
  `puzzleId` int DEFAULT NULL,
  `artifactId` int DEFAULT NULL,
  PRIMARY KEY (`idPuzzleArtifact`),
  KEY `FK_c9c0496755cf059295b0b4b4269` (`puzzleId`),
  KEY `FK_03dbe44822f20fa57d7a0b8da5d` (`artifactId`),
  CONSTRAINT `FK_03dbe44822f20fa57d7a0b8da5d` FOREIGN KEY (`artifactId`) REFERENCES `artifact` (`idArtifact`) ON DELETE CASCADE,
  CONSTRAINT `FK_c9c0496755cf059295b0b4b4269` FOREIGN KEY (`puzzleId`) REFERENCES `puzzle` (`idPuzzle`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puzzle_artifact`
--

LOCK TABLES `puzzle_artifact` WRITE;
/*!40000 ALTER TABLE `puzzle_artifact` DISABLE KEYS */;
INSERT INTO `puzzle_artifact` VALUES (1,1,1),(2,2,2),(3,3,3),(4,3,4),(5,4,5),(6,4,6),(7,4,7),(8,4,8);
/*!40000 ALTER TABLE `puzzle_artifact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `idRoom` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `code` varchar(20) NOT NULL,
  `time` time NOT NULL,
  `dataCreation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `visibility` tinyint NOT NULL DEFAULT '1',
  `active` tinyint NOT NULL DEFAULT '1',
  `totalLike` int NOT NULL DEFAULT '0',
  `scenarioId` int NOT NULL,
  `idUser` int DEFAULT NULL,
  `endgame` text NOT NULL,
  `victory` text NOT NULL,
  PRIMARY KEY (`idRoom`),
  UNIQUE KEY `IDX_0ab3536ee398cffd79acd2803c` (`code`),
  KEY `FK_f55ad91b8be4236f655d8b7fd53` (`idUser`),
  KEY `FK_47b38d8a73cfc805e54b9d7ed62` (`scenarioId`),
  CONSTRAINT `FK_47b38d8a73cfc805e54b9d7ed62` FOREIGN KEY (`scenarioId`) REFERENCES `scenario` (`idScenario`),
  CONSTRAINT `FK_f55ad91b8be4236f655d8b7fd53` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Teste da sala ','\nAqui está uma descrição simplificada para o professor entender como configurar o puzzle do PC:\n\nPuzzle do Computador\n\nContexto: O jogador precisa desbloquear o computador do escritório para encontrar um dos papéis que contém parte do código final. Mas, antes de acessar o computador, o jogador deve resolver dois passos.\n\nPasso 1 - Ligar o Roteador:\n\nO roteador está desconectado da tomada, e o jogador precisa \"ligá-lo\" para ter acesso à internet. Essa é uma ação simples no jogo, sem pergunta envolvida.\nPasso 2 - Descobrir a Senha:\n\nDica: O professor deve criar uma pergunta cuja resposta será a senha do computador.\nExemplo: \"Qual é o ano da fundação da empresa fictícia X?\".\nO jogador deverá usar essa informação para acertar a senha.\nDesfecho: Ao acertar a senha, o computador será desbloqueado e o jogador encontrará um arquivo digital com o papel vermelho, que contém parte do código necessário para escapar.\n\n','euH3iJ','00:30:00','2024-10-20 01:01:13',1,1,0,1,1,'',''),(2,'finha','adwasd','QNeGsJ','03:01:00','2024-10-20 01:27:44',1,1,0,1,1,'',''),(3,'f','f','GDEI0b','04:54:00','2024-10-20 22:02:37',1,1,0,1,1,'',''),(4,'hhfh','fhfhf','gXqMrn','03:30:00','2024-10-20 22:18:03',1,1,0,1,1,'',''),(5,'etret','etrt','o9YLAk','03:04:00','2024-10-21 05:29:53',1,1,0,1,1,'',''),(6,'gg','gdgd','nQcf63','00:30:00','2024-10-21 05:31:12',1,1,0,1,1,'',''),(7,'s','s','iNkjUh','00:32:00','2024-10-21 05:52:18',1,1,0,1,1,'',''),(8,'Sala teste','dddds\ndads\nfer\n\ngrrg\ngrg\nrrg\nrg\ngr\ngggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg\ndd\n\n\ndd','IqClvp','00:10:00','2024-10-21 06:35:42',1,1,0,1,1,'',''),(9,'d','d','LOVxY7','03:03:00','2024-10-27 19:47:15',1,1,0,1,1,'',''),(10,'d','d','izKVjP','04:05:00','2024-10-27 22:23:23',1,1,0,1,1,'d','d'),(11,'s','dd','jGBPxe','03:03:00','2024-10-27 22:39:32',1,1,0,1,1,'a','ff'),(12,'testes tempo','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nSDFS\n\n\nFSDFSF\nES\nFSD\nF\nSF\nSEF\nS','5VFTtE','00:00:10','2024-10-27 23:40:59',1,1,0,1,1,'ASSSSSSSSSSSSSSSSSSSSSDWASFDAS\nSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS\n\n\nA\nA\nA\nDWDWDA','FESDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDF\nASSSSSSSSSSSSSSSSSSSSSDWASFDAS\nSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS\n\n\nA\nA\nA\nDWDWDA'),(13,'a','F','111111','00:20:00','2024-10-28 01:07:12',1,1,0,1,1,'ds','ds'),(14,'Sala 1','d','DFrUWW','04:04:00','2024-10-29 19:05:39',1,1,0,1,2,'d','d'),(15,'Sla 2','f','6eHwqL','04:04:00','2024-10-29 19:07:21',1,1,0,1,2,'f','f'),(16,'Sala 3','f','o85PKr','05:04:00','2024-10-29 19:07:56',1,1,0,1,2,'f','f'),(17,'Sala 4','f','FZK1Xu','06:05:00','2024-10-29 19:08:18',1,1,0,1,2,'f','f'),(18,'c','d','VLimrj','04:04:00','2024-11-01 14:09:07',1,1,0,1,1,'d','d'),(19,'s','d','ilmIMP','04:04:00','2024-11-02 16:43:56',1,1,0,1,1,'d','d'),(20,'x','sfe','123456','00:00:10','2024-11-13 03:36:04',1,1,0,1,1,'sfe','sfe'),(21,'d','s','el6vsH','22:02:00','2024-11-21 05:23:54',1,1,0,1,1,'sf','efd');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_artifact`
--

DROP TABLE IF EXISTS `room_artifact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_artifact` (
  `idRoomArtifact` int NOT NULL AUTO_INCREMENT,
  `value` text,
  `roomPuzzleId` int DEFAULT NULL,
  `artifactId` int DEFAULT NULL,
  PRIMARY KEY (`idRoomArtifact`),
  KEY `FK_1b7ec9ce82dec85d30610df2294` (`roomPuzzleId`),
  KEY `FK_f55bf49d483ed451ec2011a0eca` (`artifactId`),
  CONSTRAINT `FK_1b7ec9ce82dec85d30610df2294` FOREIGN KEY (`roomPuzzleId`) REFERENCES `room_puzzle` (`idRoomPuzzle`) ON DELETE CASCADE,
  CONSTRAINT `FK_f55bf49d483ed451ec2011a0eca` FOREIGN KEY (`artifactId`) REFERENCES `artifact` (`idArtifact`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_artifact`
--

LOCK TABLES `room_artifact` WRITE;
/*!40000 ALTER TABLE `room_artifact` DISABLE KEYS */;
INSERT INTO `room_artifact` VALUES (33,'',17,1),(34,'',18,5),(35,'',18,6),(36,'',18,7),(37,'',18,8),(38,'',20,3),(39,'',20,4),(40,'',19,2),(41,'pc',21,1),(42,'ver',24,5),(43,'fv',22,2),(44,'c',23,3),(45,'s',23,4),(46,'ve',24,6),(47,'am',24,7),(48,'az',24,8),(49,'',25,1),(50,'',26,2),(51,'',27,3),(52,'',27,4),(53,'',28,5),(54,'',28,6),(55,'',28,7),(56,'',28,8),(57,'Dica do computador que pode ser grande nem sei ?',29,1),(58,'Perguntas ve f\n\nasdddddds\n\n\nasddsadasdad\n\nasdasdasdsada\n\n\nasdasdasdasdsda\n',30,2),(59,'Tabela de Tradução:\nAgora cada símbolo está associado a 3 letras:\n\n1 -> ε\n2 -> α\n3 -> β\n4 -> γ\n5 -> δ\n6 -> θ\n7 -> φ\n8 -> ψ\n9 -> ω\nLetras associadas aos símbolos:\nA, B, C -> ε\nD, E, F -> α\nG, H, I -> β\nJ, K, L -> γ\nM, N, O -> δ\nP, Q, R -> θ\nS, T, U -> φ\nV, W, X -> ψ\nY, Z -> ω\nIsso ajusta o conteúdo para ficar mais fácil de entender, mantendo 3 letras por símbolo. Assim, todas as letras do alfabeto cabem nos 9 símbolos.',31,3),(60,'Tabela de Tradução:\nAgora cada símbolo está associado a 3 letras:\n\n1 -> ε\n2 -> α\n3 -> β\n4 -> γ\n5 -> δ\n6 -> θ\n7 -> φ\n8 -> ψ\n9 -> ω\nLetras associadas aos símbolos:\nA, B, C -> ε\nD, E, F -> α\nG, H, I -> β\nJ, K, L -> γ\nM, N, O -> δ\nP, Q, R -> θ\nS, T, U -> φ\nV, W, X -> ψ\nY, Z -> ω\nIsso ajusta o conteúdo para ficar mais fácil de entender, mantendo 3 letras por símbolo. Assim, todas as letras do alfabeto cabem nos 9 símbolos.',32,5),(61,'Tabela de Tradução:\nAgora cada símbolo está associado a 3 letras:\n\n1 -> ε\n2 -> α\n3 -> β\n4 -> γ\n5 -> δ\n6 -> θ\n7 -> φ\n8 -> ψ\n9 -> ω\nLetras associadas aos símbolos:\nA, B, C -> ε\nD, E, F -> α\nG, H, I -> β\nJ, K, L -> γ\nM, N, O -> δ\nP, Q, R -> θ\nS, T, U -> φ\nV, W, X -> ψ\nY, Z -> ω\nIsso ajusta o conteúdo para ficar mais fácil de entender, mantendo 3 letras por símbolo. Assim, todas as letras do alfabeto cabem nos 9 símbolos.',32,6),(62,'Tabela de Tradução:\nAgora cada símbolo está associado a 3 letras:\n\n1 -> ε\n2 -> α\n3 -> β\n4 -> γ\n5 -> δ\n6 -> θ\n7 -> φ\n8 -> ψ\n9 -> ω\nLetras associadas aos símbolos:\nA, B, C -> ε\nD, E, F -> α\nG, H, I -> β\nJ, K, L -> γ\nM, N, O -> δ\nP, Q, R -> θ\nS, T, U -> φ\nV, W, X -> ψ\nY, Z -> ω\nIsso ajusta o conteúdo para ficar mais fácil de entender, mantendo 3 letras por símbolo. Assim, todas as letras do alfabeto cabem nos 9 símbolos.',31,4),(63,'Tabela de Tradução:\nAgora cada símbolo está associado a 3 letras:\n\n1 -> ε\n2 -> α\n3 -> β\n4 -> γ\n5 -> δ\n6 -> θ\n7 -> φ\n8 -> ψ\n9 -> ω\nLetras associadas aos símbolos:\nA, B, C -> ε\nD, E, F -> α\nG, H, I -> β\nJ, K, L -> γ\nM, N, O -> δ\nP, Q, R -> θ\nS, T, U -> φ\nV, W, X -> ψ\nY, Z -> ω\nIsso ajusta o conteúdo para ficar mais fácil de entender, mantendo 3 letras por símbolo. Assim, todas as letras do alfabeto cabem nos 9 símbolos.',32,7),(64,'Tabela de Tradução:\nAgora cada símbolo está associado a 3 letras:\n\n1 -> ε\n2 -> α\n3 -> β\n4 -> γ\n5 -> δ\n6 -> θ\n7 -> φ\n8 -> ψ\n9 -> ω\nLetras associadas aos símbolos:\nA, B, C -> ε\nD, E, F -> α\nG, H, I -> β\nJ, K, L -> γ\nM, N, O -> δ\nP, Q, R -> θ\nS, T, U -> φ\nV, W, X -> ψ\nY, Z -> ω\nIsso ajusta o conteúdo para ficar mais fácil de entender, mantendo 3 letras por símbolo. Assim, todas as letras do alfabeto cabem nos 9 símbolos.',32,8),(65,'',36,3),(66,'',33,1),(67,'',34,2),(68,'',35,5),(69,'',35,6),(70,'',36,4),(71,'',35,7),(72,'',35,8),(73,'',37,1),(74,'',38,2),(75,'',39,3),(76,'',40,5),(77,'',39,4),(78,'',40,7),(79,'',40,6),(80,'',40,8),(81,'',41,1),(82,'',42,2),(83,'',44,3),(84,'',43,5),(85,'',43,7),(86,'',43,8),(87,'',44,4),(88,'',43,6),(89,'a',45,1),(90,'f',47,3),(91,'sf',46,2),(92,'sf',47,4),(93,'d',48,5),(94,'g',48,6),(95,'v',48,7),(96,'c',48,8),(97,'Modelo de desenvolvimento de software que é conhecido por combinar prototipação com análise de riscos em ciclos iterativos',49,1),(98,'1) Analise as afirmações a seguir:\n\nI.Polimorfismo permite que uma classe mude seu tipo em tempo de execução.\nII.Encapsulamento pode ser visto como o agrupamento de dados com métodos que operam nesses dados.\nIII.Sobrecarga de método ocorre quando uma classe possui vários métodos com o mesmo nome, mas parâmetros diferentes.\nIV.Abstração é a capacidade de diferentes classes serem tratadas como instâncias da mesma classe através da herança.\nÉ correto o que se afirma em: \n\nA) II, apenas.\nB) I e IV, apenas.\nC) I, III e IV, apenas.\nD) II e III, apenas.\nE) I, II, III e IV.\n\n2) Segundo Pressman, quantas atividades fundamentais compõem o processo de desenvolvimento de software?',51,3),(99,'- A programação em pares é uma prática ágil em que dois desenvolvedores trabalham juntos, um escrevendo o código e o outro revisando.\n\n- No Scrum, uma Sprint representa um intervalo de tempo em que uma equipe deve concluir um conjunto específico de trabalho.\n\n- O Modelo em Cascata permite revisitar fases anteriores durante o desenvolvimento.\n\n- O Kanban é um método de gerenciamento de fluxo de trabalho que utiliza cartões para visualizar o trabalho em progresso.\n\n- O teste de unidade verifica o comportamento do sistema como um todo.',50,2),(100,'3) Complete as afirmações: \n\nRequisitos ____ descrevem as funcionalidades e comportamentos específicos que o sistema deve realizar para atender às necessidades do usuário.\n\nNo levantamento de requisitos, o processo de ____ envolve a coleta inicial das necessidades dos usuários e stakeholders.\n\nA ____ verifica se todos os requisitos do sistema estão livres de ambiguidades e inconsistências.\n\n\n*Use as iniciais',51,4),(101,'Em projetos de desenvolvimento de software uma das primeiras importantes decisões que se deve tomar é como gerenciar processos, atividades e tarefas que serão executados durante o ciclo de vida do projeto. O entendimento do funcionamento da interação entre a equipe de desenvolvimento e o cliente é fundamental para o sucesso do projeto. Para definir como devemos gerenciar todas essas questões, existem diversos modelos de clico de vida de software. Cada modelo possui especificidades e pode apresentar vantagens e desvantagens, a depender de características inerentes ao projeto. A respeito dos diferentes modelos de ciclo de vida de um software, analise as afirmativas abaixo:\n\nI. O Modelo cascata tem como principal característica o fato das etapas serem executadas de forma sequencial. Isso demanda, obviamente, um grande planejamento como por exemplo, a definição completa de requisitos antes da implementação.\n\nII. O Modelo Incremental é uma evolução do modelo Cascata. Aqui o projeto é quebrado em módulos. As etapas também são executadas sequencialmente mas focadas apenas no módulo em desenvolvimento no momento. Dessa forma o processo de planejamento se torna menos desafiador pois o cliente recebe os diversos módulos gradualmente.\n\nIII. No Modelo Espiral as fases do processo de desenvolvimento representam um volta completa na espiral. Trata-se de um modelo de grande aceitação por parte do cliente dada a sua simplicidade. Recomenda-se fortemente que seja aplicado somente em projetos de pequeno porte, uma vez que o modelo não contempla atividades relacionadas ao gerenciamento de riscos. \n\n\n*Multiplique as respostas corretas',52,5),(102,'No contexto de Engenharia de Software, qual a definição que melhor se enquadra a Regras de Negócio?\n\n2) Uma política, diretriz, norma ou regulamento que defina ou restrinja algum aspecto do negócio.\n\n4) Uma restrição que é imposta às escolhas disponíveis para o desenvolvedor para o projeto e construção de um produto.\n\n6) Um tipo de requisito não-funcional que descreve um serviço ou uma característica de desempenho de um produto.\n\n8) Uma meta de negócios da organização que constrói um produto ou do cliente que o adquire.',52,6),(103,'Uma das características que a Engenharia de Software tenta garantir é que um software deve ser escrito de tal forma que ele possa evoluir para satisfazer as diferentes necessidades dos clientes. Isso é uma característica essencial, pois a mudança no software é uma exigência inevitável porque os ambientes de negócios são dinâmicos. Diante disso, somando os valores das letras conforme suas posições no alfabeto, qual é o número associado à resposta correta?\n\nPortabilidade      ----   143\n\nAceitabilidade     ----   134\n\nAdaptabilidade     ----   106\n\nManutenibilidade   ----   111\n\nCodificabilidade   ----   105\n\n\n* Os valores não estão nas posições corretas',52,7),(104,'O Guide to the Software Engineering Body of Knowledge, conhecido pela sigla SWEBOK, é um documento criado sob o patrocínio da IEEE com a finalidade de servir de referência em assuntos considerados, de forma generalizada pela comunidade, como pertinentes à área de Engenharia de Software. O SWEBOK apresenta uma classificação hierárquica dos tópicos tratados pela Engenharia de Software, em que o nível mais alto são as Áreas do Conhecimento. Qual é a alternativa que apresenta áreas do Conhecimento do SWEBOK.\n\n\n1) Requisitos de Software; Teste de Software; Gestão de Custos do Projeto; Qualidade de Software.\n\n2)Requisitos de Software; Riscos de Software; Gerência de Configuração de Software; Qualidade de Software.\n\n3)Requisitos de Software; Teste de Software; Gerência de Configuração de Software; Gestão de Aquisições de Software.\n\n4)Requisitos de Software; Teste de Software; Gerência de Configuração de Software; Qualidade de Software.\n\n5)Requisitos de Software; Gestão de Comunicação do Projeto; Gerência de Configuração de Software; Qualidade de Software.',52,8),(105,'d',56,2),(106,'d',55,3),(107,'d',54,5),(108,'d',53,1),(109,'d',55,4),(110,'d',54,7),(111,'d',54,8),(112,'d',54,6),(113,'d',57,1),(114,'d',59,3),(115,'d',58,2),(116,'d',59,4),(117,'g',60,5),(118,'x',60,6),(119,'x',60,7),(120,'x',60,8),(121,'f',61,1),(122,'g',64,5),(123,'g',64,6),(124,'g',64,7),(125,'g',64,8),(126,'g',62,2),(127,'g',63,3),(128,'g',63,4),(129,'d',65,1),(130,'x',68,5),(131,'d',66,2),(132,'f',68,6),(133,'g',68,7),(134,'g',68,8),(135,'g',67,3),(136,'x',67,4),(137,'',69,1),(138,'',70,2),(139,'',71,3),(140,'',72,5),(141,'',72,6),(142,'',71,4),(143,'',72,7),(144,'',72,8),(145,'',73,1),(146,'',74,2),(147,'',75,3),(148,'',76,5),(149,'',75,4),(150,'',76,6),(151,'',76,7),(152,'',76,8),(153,'',80,5),(154,'',77,1),(155,'',78,2),(156,'',79,3),(157,'',80,8),(158,'',79,4),(159,'',80,6),(160,'',80,7),(161,'',81,1),(162,'',82,2),(163,'',83,3),(164,'',84,5),(165,'',84,6),(166,'',83,4),(167,'',84,7),(168,'',84,8);
/*!40000 ALTER TABLE `room_artifact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_content`
--

DROP TABLE IF EXISTS `room_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_content` (
  `roomIdRoom` int NOT NULL,
  `contentIdContent` int NOT NULL,
  PRIMARY KEY (`roomIdRoom`,`contentIdContent`),
  KEY `IDX_c267109ae480c3720cf0162ebb` (`roomIdRoom`),
  KEY `IDX_b2ea8cef08a61ea0c495e87137` (`contentIdContent`),
  CONSTRAINT `FK_b2ea8cef08a61ea0c495e871377` FOREIGN KEY (`contentIdContent`) REFERENCES `content` (`idContent`),
  CONSTRAINT `FK_c267109ae480c3720cf0162ebb5` FOREIGN KEY (`roomIdRoom`) REFERENCES `room` (`idRoom`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_content`
--

LOCK TABLES `room_content` WRITE;
/*!40000 ALTER TABLE `room_content` DISABLE KEYS */;
INSERT INTO `room_content` VALUES (1,1),(3,2),(8,3);
/*!40000 ALTER TABLE `room_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_puzzle`
--

DROP TABLE IF EXISTS `room_puzzle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_puzzle` (
  `idRoomPuzzle` int NOT NULL AUTO_INCREMENT,
  `answer` text NOT NULL,
  `roomId` int DEFAULT NULL,
  `puzzleId` int DEFAULT NULL,
  PRIMARY KEY (`idRoomPuzzle`),
  KEY `FK_b5fea5e37d87c986ac088c4f666` (`roomId`),
  KEY `FK_2a6f2009be2f4f21c3d14c4ec66` (`puzzleId`),
  CONSTRAINT `FK_2a6f2009be2f4f21c3d14c4ec66` FOREIGN KEY (`puzzleId`) REFERENCES `puzzle` (`idPuzzle`) ON DELETE CASCADE,
  CONSTRAINT `FK_b5fea5e37d87c986ac088c4f666` FOREIGN KEY (`roomId`) REFERENCES `room` (`idRoom`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_puzzle`
--

LOCK TABLES `room_puzzle` WRITE;
/*!40000 ALTER TABLE `room_puzzle` DISABLE KEYS */;
INSERT INTO `room_puzzle` VALUES (17,'',5,1),(18,'',5,4),(19,'',5,2),(20,'',5,3),(21,'pc',6,1),(22,'12345',6,2),(23,'12345',6,3),(24,'123456',6,4),(25,'',7,1),(26,'',7,2),(27,'',7,3),(28,'',7,4),(29,'carro',8,1),(30,'3434',8,2),(31,'1234',8,3),(32,'45678',8,4),(33,'',9,1),(34,'',9,2),(35,'',9,4),(36,'',9,3),(37,'',10,1),(38,'',10,2),(39,'',10,3),(40,'',10,4),(41,'',11,1),(42,'',11,2),(43,'',11,4),(44,'',11,3),(45,'a',12,1),(46,'1',12,2),(47,'1',12,3),(48,'34',12,4),(49,'espiral',13,1),(50,'3232',13,2),(51,'25228',13,3),(52,'221434',13,4),(53,'d',14,1),(54,'d',14,4),(55,'d',14,3),(56,'d',14,2),(57,'d',15,1),(58,'d',15,2),(59,'d',15,3),(60,'g',15,4),(61,'f',16,1),(62,'g',16,2),(63,'g',16,3),(64,'g',16,4),(65,'d',17,1),(66,'d',17,2),(67,'g',17,3),(68,'x',17,4),(69,'',18,1),(70,'',18,2),(71,'',18,3),(72,'',18,4),(73,'',19,1),(74,'',19,2),(75,'',19,3),(76,'',19,4),(77,'',20,1),(78,'',20,2),(79,'',20,3),(80,'123456',20,4),(81,'',21,1),(82,'',21,2),(83,'',21,3),(84,'',21,4);
/*!40000 ALTER TABLE `room_puzzle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_subject`
--

DROP TABLE IF EXISTS `room_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_subject` (
  `roomIdRoom` int NOT NULL,
  `subjectIdSubject` int NOT NULL,
  PRIMARY KEY (`roomIdRoom`,`subjectIdSubject`),
  KEY `IDX_0a31ef5a470cddae4af941a938` (`roomIdRoom`),
  KEY `IDX_2240a81f4a2911a2f2b5763e9a` (`subjectIdSubject`),
  CONSTRAINT `FK_0a31ef5a470cddae4af941a9382` FOREIGN KEY (`roomIdRoom`) REFERENCES `room` (`idRoom`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_2240a81f4a2911a2f2b5763e9a0` FOREIGN KEY (`subjectIdSubject`) REFERENCES `subject` (`idSubject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_subject`
--

LOCK TABLES `room_subject` WRITE;
/*!40000 ALTER TABLE `room_subject` DISABLE KEYS */;
INSERT INTO `room_subject` VALUES (1,1),(3,2),(8,3);
/*!40000 ALTER TABLE `room_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenario`
--

DROP TABLE IF EXISTS `scenario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scenario` (
  `idScenario` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `img` varchar(50) NOT NULL,
  `level` varchar(50) NOT NULL,
  PRIMARY KEY (`idScenario`),
  UNIQUE KEY `IDX_7ddb0b8fd6b50f79d7e55890a9` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenario`
--

LOCK TABLES `scenario` WRITE;
/*!40000 ALTER TABLE `scenario` DISABLE KEYS */;
INSERT INTO `scenario` VALUES (1,'Escritório','<p>Neste cenário, o jogador se encontra preso em um luxuoso escritório executivo, repleto de móveis sofisticados e detalhes elegantes. Para escapar, ele precisará descobrir um código secreto que desbloqueia a porta. Esse código está dividido em quatro partes, cada uma escrita em papéis coloridos espalhados pela sala, que irá conter perguntas cujas respostas formam o código final.</p>\n\n<p>Para encontrar esses papéis, o jogador deve resolver uma série de enigmas e desbloquear diferentes objetos no escritório. Cada objeto contém uma parte do código:</p>\n\n<ul>\n  <li><strong>Computador</strong>: Protegido por uma senha, ele precisa ser desbloqueado com base em uma dica no próprio computador.</li>\n  <li><strong>Baú</strong>: Trancado com um cadeado numérico, o jogador deve resolver questões de Verdadeiro ou Falso contidas em um documento. A quantidade de respostas V e F será o código para abrir o cadeado.</li>\n  <li><strong>Cofre</strong>: Trancado por um código numérico, que pode ser descoberto ao responder corretamente as questões encontradas em um caderno.</li>\n  <li><strong>Exploração da Sala</strong>: Um dos papéis estará escondido em algum ponto da sala, exigindo que o jogador observe atentamente o ambiente. Além disso, a ordem correta dos números do código final será determinada pelas cores dos papéis, e essa ordem também estará desenhada em um outro papel escondido.</li>\n</ul>\n\n<p>Ao juntar as quatro partes do código e seguir a ordem correta determinada pelas cores dos papéis, o jogador poderá desbloquear a porta e escapar do escritório.</p>\n','escritorioImg','escritorio');
/*!40000 ALTER TABLE `scenario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenario_puzzle`
--

DROP TABLE IF EXISTS `scenario_puzzle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scenario_puzzle` (
  `idScenarioPuzzle` int NOT NULL AUTO_INCREMENT,
  `scenarioId` int DEFAULT NULL,
  `puzzleId` int DEFAULT NULL,
  PRIMARY KEY (`idScenarioPuzzle`),
  KEY `FK_8043c76439900bf8f49e4467713` (`scenarioId`),
  KEY `FK_59b1d58de32ab5de4708eb45f17` (`puzzleId`),
  CONSTRAINT `FK_59b1d58de32ab5de4708eb45f17` FOREIGN KEY (`puzzleId`) REFERENCES `puzzle` (`idPuzzle`) ON DELETE CASCADE,
  CONSTRAINT `FK_8043c76439900bf8f49e4467713` FOREIGN KEY (`scenarioId`) REFERENCES `scenario` (`idScenario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenario_puzzle`
--

LOCK TABLES `scenario_puzzle` WRITE;
/*!40000 ALTER TABLE `scenario_puzzle` DISABLE KEYS */;
INSERT INTO `scenario_puzzle` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4);
/*!40000 ALTER TABLE `scenario_puzzle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `idSubject` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`idSubject`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'quimica'),(2,'323'),(3,'aa');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `creator` tinyint NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'larissa@gmail.com','$2b$10$FtzwPtZlCY1Ueokd3soUPe8uj/OFObVdisS8FGzYUXDPmimw8szA.',1,'larissa'),(2,'l@gmail.com','$2b$10$wpFHpUydXYpXkzW.IHzFvetz08jjTRLCz8iU1JVsnMqHEUnOo5wIq',1,'l');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_game`
--

DROP TABLE IF EXISTS `user_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_game` (
  `userIdUser` int NOT NULL,
  `gameIdGame` int NOT NULL,
  PRIMARY KEY (`userIdUser`,`gameIdGame`),
  KEY `IDX_de36e1a640320a2f5a0ceb46a9` (`userIdUser`),
  KEY `IDX_49aaaceb5feed698c5a9af61bf` (`gameIdGame`),
  CONSTRAINT `FK_49aaaceb5feed698c5a9af61bfe` FOREIGN KEY (`gameIdGame`) REFERENCES `game` (`idGame`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_de36e1a640320a2f5a0ceb46a93` FOREIGN KEY (`userIdUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_game`
--

LOCK TABLES `user_game` WRITE;
/*!40000 ALTER TABLE `user_game` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_room`
--

DROP TABLE IF EXISTS `user_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_room` (
  `userIdUser` int NOT NULL,
  `roomIdRoom` int NOT NULL,
  PRIMARY KEY (`userIdUser`,`roomIdRoom`),
  KEY `IDX_8dd8576e101226e225c85afd6b` (`userIdUser`),
  KEY `IDX_2a706ceeaf510440e545ac20da` (`roomIdRoom`),
  CONSTRAINT `FK_2a706ceeaf510440e545ac20da0` FOREIGN KEY (`roomIdRoom`) REFERENCES `room` (`idRoom`),
  CONSTRAINT `FK_8dd8576e101226e225c85afd6bf` FOREIGN KEY (`userIdUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_room`
--

LOCK TABLES `user_room` WRITE;
/*!40000 ALTER TABLE `user_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-21  4:22:20
