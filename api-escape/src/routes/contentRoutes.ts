import { Router } from "express";
import ContentController from "../controllers/ContentController";

const contentRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Contents
 *  description: manage contents
 */

/**
 * @swagger
 * /contents/all:
 *   get:
 *     tags: [Contents]
 *     summary: Retrieve a list of contents
 *     description: Retrieve a list of contents.
 *     responses:
 *       200:
 *         description: A list of contents.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *       500:
 *         description: Error retrieving contents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to fetch content."
 */
contentRouter.get("/contents/all", ContentController.getAllContents);

/**
 * @swagger
 * /contents/{id}:
 *   get:
 *     tags: [Contents]
 *     summary: Retrieve a single content by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The requested id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Content not found.
 *       500:
 *         description: An internal error occurred while retrieving the content.
 */
contentRouter.get("/contents/:id", ContentController.getContentById);

/**
 * @swagger
 * /contents/{id}:
 *   put:
 *     tags: [Contents]
 *     summary: Update a single content by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Content updated successfully.
 *       404:
 *         description: Content not found.
 *       500:
 *         description: An internal error occurred while deleting the content.
 */
contentRouter.put("/contents/:id", ContentController.updateContent);

/**
 * @swagger
 * /contents/{id}:
 *   delete:
 *     tags: [Contents]
 *     summary: Delete a single content by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Content deleted successfully.
 *       404:
 *         description: Content not found.
 *       500:
 *         description: An internal error occurred while deleting the content.
 */
contentRouter.delete("/contents/:id", ContentController.deleteContent);

/**
 * @swagger
 * /contents/find_create/{name}:
 *   get:
 *     tags: [Contents]
 *     summary: Find or create a single content by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content found or created successfully.
 *       500:
 *         description: An internal error occurred while finding or creating the content.
 */
contentRouter.get(
  "/contents/find_create/:name",
  ContentController.findOrCreateContent
);

export default contentRouter;
