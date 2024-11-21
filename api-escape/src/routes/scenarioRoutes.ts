import e, { Router } from "express";
import ScenarioController from "../controllers/ScenarioController";

const scenarioRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Scenarios
 *  description: manage scenarios
 */

/**
 * @swagger
 * /scenarios/all:
 *   get:
 *     tags: [Scenarios]
 *     summary: Retrieve a list of scenarios
 *     description: Retrieve a list of scenarios.
 *     responses:
 *       200:
 *         description: A list of scenarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Scenario'
 *       500:
 *         description: Error retrieving scenarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to fetch scenarios."
 */
scenarioRouter.get("/scenarios/all", ScenarioController.getAllScenarios);

export default scenarioRouter;
