import swaggerJsdoc from "swagger-jsdoc";
import config from "./env";
import { Scenario } from "../models/entities/Scenario";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Escape Room API",
    version: "1.0.0",
    description: "API for managing users and content in an escape room game",
  },
  servers: [
    {
      url: `http://localhost:${config.server.port}`,
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          idUser: {
            type: "integer",
            description: "User ID",
          },
          username: {
            type: "string",
            description: "Username",
          },
          email: {
            type: "string",
            description: "User email address",
          },
          password: {
            type: "string",
            description: "User password",
          },
          creator: {
            type: "boolean",
            description: "Whether the user is a content creator (1) or not (0)",
          },
        },
        required: ["idUser", "username", "email", "password", "creator"],
      },
      Game: {
        type: "object",
        properties: {
          idGame: {
            type: "integer",
            description: "Game ID",
          },
          win: {
            type: "boolean",
            description: "Whether the game was won (1) or not (0)",
          },
          timeEnd: {
            type: "time",
            description: "Game end time",
          },
          dataGame: {
            type: "timestamp",
            description: "Game date",
          },
          room: {
            $ref: "#/components/schemas/Room",
          },
        },
        required: ["idGame", "win", "timeEnd", "dataGame", "room"],
      },
      Room: {
        type: "object",
        properties: {
          idRoom: {
            type: "integer",
            description: "Room ID",
          },
          name: {
            type: "string",
            description: "Room name",
          },
          description: {
            type: "string",
            description: "Room description",
          },
          code: {
            type: "string",
            description: "Room code",
          },
          time: {
            type: "time",
            description: "Room time",
          },
          dataCreation: {
            type: "timestamp",
            description: "Room creation date",
          },
          visibility: {
            type: "boolean",
            description: "Room visibility",
          },
          active: {
            type: "boolean",
            description: "Room active",
          },
          totalLike: {
            type: "integer",
            description: "Room total likes",
          },
          scenarioId: {
            type: "number",
            description: "Room scenario",
          },
          subject: {
            $ref: "#/components/schemas/Subject",
          },
          user: {
            $ref: "#/components/schemas/User",
          },
          contents: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Content",
            },
          },
        },
        required: [
          "idRoom",
          "name",
          "description",
          "code",
          "time",
          "dataCreation",
          "visibility",
          "active",
          "totalLike",
          "scenarioId",
          "subject",
          "user",
          "contents",
        ],
      },
      RoomPuzzle: {
        type: "object",
        properties: {
          idRoomPuzzle: {
            type: "integer",
            description: "Room puzzle ID",
          },
          answer: {
            type: "string",
            description: "Room puzzle answer",
          },
          puzzle: {
            $ref: "#/components/schemas/Puzzle",
          },
          room: {
            $ref: "#/components/schemas/Room",
          },
        },
        required: ["idRoomPuzzle", "answer", "puzzle", "room"],
      },
      Puzzle: {
        type: "object",
        properties: {
          idPuzzle: {
            type: "integer",
            description: "Puzzle ID",
          },
          name: {
            type: "string",
            description: "Puzzle name",
          },
          description: {
            type: "string",
            description: "Puzzle description",
          },
          artifactIds: {
            type: "array",
            items: {
              type: "integer",
            },
          },
        },
        required: ["idPuzzle", "name", "description", "artifactIds"],
      },
      PuzzleArtifact: {
        type: "object",
        properties: {
          idPuzzleArtifact: {
            type: "integer",
            description: "Puzzle artifact ID",
          },
          value: {
            type: "string",
            description: "Puzzle artifact value",
          },
          artifact: {
            $ref: "#/components/schemas/Artifact",
          },
          puzzle: {
            $ref: "#/components/schemas/Puzzle",
          },
        },
        required: ["idPuzzleArtifact", "value", "artifact", "puzzle"],
      },
      Artifact: {
        type: "object",
        properties: {
          idObject: {
            type: "integer",
            description: "Object ID",
          },
          name: {
            type: "string",
            description: "Object name",
          },
        },
        required: ["idObject", "name"],
      },
      Content: {
        type: "object",
        properties: {
          idContent: {
            type: "integer",
            description: "Content ID",
          },
          name: {
            type: "string",
            description: "Content name",
          },
        },
        required: ["idContent", "name"],
      },
      Subject: {
        type: "object",
        properties: {
          idSubject: {
            type: "integer",
            description: "Subject ID",
          },
          name: {
            type: "string",
            description: "Subject name",
          },
        },
        required: ["idSubject", "name"],
      },
      Scenario: {
        type: "object",
        properties: {
          idScenario: {
            type: "integer",
            description: "Scenario ID",
          },
          name: {
            type: "string",
            description: "Scenario name",
          },
          description: {
            type: "string",
            description: "Scenario description",
          },
          img: {
            type: "string",
            description: "Scenario image",
          },
        },
        required: ["idScenario", "name", "description", "img"],
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/userRoutes.ts",
    "./src/routes/gameRoutes.ts",
    "./src/routes/roomRoutes.ts",
    "./src/routes/puzzleRoutes.ts",
    "./src/routes/artifactRoutes.ts",
    "./src/routes/contentRoutes.ts",
    "./src/routes/subjectRoutes.ts",
    "./src/routes/scenarioRoutes.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
