import { Router } from "express";
import PuzzleController from "../controllers/PuzzleController";

const puzzleRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Puzzles
 *  description: manage puzzles
 */

/**
 * @swagger
 * /puzzles/all:
 *   get:
 *     tags: [Puzzles]
 *     summary: Retrieve all puzzles
 *     responses:
 *       200:
 *         description: List of all puzzles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Puzzle'
 */
puzzleRouter.get("/puzzles/all", PuzzleController.getAllPuzzles);

/**
 * @swagger
 * /puzzles/{id}:
 *   get:
 *     tags: [Puzzles]
 *     summary: Retrieve a single puzzle by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the puzzle
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single puzzle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Puzzle'
 *       404:
 *         description: Puzzle not found
 */
puzzleRouter.get("/puzzles/:id", PuzzleController.getPuzzleById);

export default puzzleRouter;
