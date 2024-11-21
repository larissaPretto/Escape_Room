import e, { Router } from "express";
import ArtifactController from "../controllers/ArtifactController";

const artifactRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Artifacts
 *  description: manage artifacts
 */

///////////////////////// ARTIFACTS /////////////////////////
/**
 * @swagger
 * /artifacts/all:
 *   get:
 *     tags: [Artifacts]
 *     summary: Retrieve all artifacts
 *     responses:
 *       200:
 *         description: List of all artifacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artifact'
 */
artifactRouter.get("/artifacts/all", ArtifactController.getAllArtifacts);

/**
 * @swagger
 * /artifacts/{id}:
 *   get:
 *     tags: [Artifacts]
 *     summary: Retrieve a single artifact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the artifact
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single artifact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artifact'
 *       404:
 *         description: Artifact not found
 */
artifactRouter.get("/artifacts/:id", ArtifactController.getArtifactById);

/**
 * @swagger
 * /artifacts:
 *   post:
 *     tags: [Artifacts]
 *     summary: Create a new artifact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artifact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artifact'
 */
artifactRouter.post("/artifacts", ArtifactController.createArtifact);

/**
 * @swagger
 * /artifacts/{id}:
 *   put:
 *     tags: [Artifacts]
 *     summary: Update an existing artifact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the artifact
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artifact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artifact'
 *       404:
 *         description: Artifact not found
 */
artifactRouter.put("/artifacts/:id", ArtifactController.updateArtifact);

/**
 * @swagger
 * /artifacts/{id}:
 *   delete:
 *     tags: [Artifacts]
 *     summary: Delete an artifact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the artifact
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Artifact deleted successfully
 *       404:
 *         description: Artifact not found
 */
artifactRouter.delete("/artifacts/:id", ArtifactController.deleteArtifact);

export default artifactRouter;
