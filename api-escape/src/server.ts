import express from "express";
import cors from "cors";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/userRoutes";
import gameRouter from "./routes/gameRoutes";
import roomRouter from "./routes/roomRoutes";
import puzzleRouter from "./routes/puzzleRoutes";
import artifactRouter from "./routes/artifactRoutes";
import contentRouter from "./routes/contentRoutes";
import subjectRouter from "./routes/subjectRoutes";
import scenarioRouter from "./routes/scenarioRoutes";
import config from "./config/env";
import swaggerSpec from "./config/swagger";

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  userRouter,
  gameRouter,
  roomRouter,
  puzzleRouter,
  artifactRouter,
  contentRouter,
  subjectRouter,
  scenarioRouter
);

app.listen(config.server.port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${config.server.port}`);
});

export default app;
