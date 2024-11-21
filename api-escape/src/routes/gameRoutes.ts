import { Router } from "express";
import GameController from "../controllers/GameController";

const gameRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Games
 *  description: manage games
 */

/**
 * @swagger
 * /games:
 *   post:
 *     tags: [Games]
 *     summary: Create a new game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idRoom:
 *                 type: number
 *               idPlayer:
 *                 type: number
 *
 *     responses:
 *       200:
 *         description: Game created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 */
gameRouter.post("/games", GameController.createGame);

export default gameRouter;
