import { DataSource, Like } from "typeorm";
import config from "./env";
import { User } from "../models/entities/User";
import { Subject } from "../models/entities/Subject";
import { Room } from "../models/entities/Room";
import { Content } from "../models/entities/Content";
import { Game } from "../models/entities/Game";
import { Artifact } from "../models/entities/Artifact";
import { Puzzle } from "../models/entities/Puzzle";
import { RoomPuzzle } from "../models/entities/RoomPuzzle";
import { PuzzleArtifact } from "../models/entities/PuzzleArtifact";
import { Scenario } from "../models/entities/Scenario";
import { ScenarioPuzzle } from "../models/entities/ScenarioPuzzle";
import { RoomArtifact } from "../models/entities/RoomArtifact";
import { Player } from "../models/entities/Player";

const AppDataSource = new DataSource({
  type: "mysql",
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.pass,
  database: config.database.name,
  synchronize: true,
  logging: false,
  entities: [
    User,
    Game,
    Room,
    Puzzle,
    Artifact,
    Content,
    Subject,
    RoomPuzzle,
    PuzzleArtifact,
    Scenario,
    ScenarioPuzzle,
    RoomArtifact,
    Player,
  ],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource;
