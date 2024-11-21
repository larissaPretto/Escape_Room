import { Router } from "express";
import SubjectController from "../controllers/SubjectController";

const subjectRouter = Router();

//tags for swagger documentation

/**
 * @swagger
 * tags:
 *  name: Subjects
 *  description: manage subjects
 */

/**
 * @swagger
 * /subjects/all:
 *   get:
 *     tags: [Subjects]
 *     summary: Retrieve a list of subjects
 *     description: Retrieve a list of subjects.
 *     responses:
 *       200:
 *         description: A list of subjects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 *       500:
 *         description: Error retrieving subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to fetch subject."
 */
subjectRouter.get("/subjects/all", SubjectController.getAllSubjects);

/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     tags: [Subjects]
 *     summary: Retrieve a single subject by id
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
 *               $ref: '#/components/schemas/Subject'
 *       404:
 *         description: Subject not found.
 *       500:
 *         description: An internal error occurred while retrieving the subject.
 */
subjectRouter.get("/subjects/:id", SubjectController.getSubjectById);

/**
 * @swagger
 * /subjects:
 *   post:
 *     tags: [Subjects]
 *     summary: Create a new subject
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
 *       201:
 *         description: Subject created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 */
subjectRouter.post("/subjects", SubjectController.createSubject);

/**
 * @swagger
 * /subjects/{id}:
 *   put:
 *     tags: [Subjects]
 *     summary: Update a single subject by id
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
 *         description: Subject updated successfully.
 *       404:
 *         description: Subject not found.
 *       500:
 *         description: An internal error occurred while updating the subject.
 */
subjectRouter.put("/subjects/:id", SubjectController.updateSubject);

/**
 * @swagger
 * /subjects/{id}:
 *   delete:
 *     tags: [Subjects]
 *     summary: Delete a single subject by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Subject deleted successfully.
 *       404:
 *         description: Subject not found.
 *       500:
 *         description: An internal error occurred while deleting the subject.
 */
subjectRouter.delete("/subjects/:id", SubjectController.deleteSubject);

/**
 * @swagger
 * /subjects/find_create/{name}:
 *   get:
 *     tags: [Subjects]
 *     summary: Find or create a subject by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subject found or created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       500:
 *         description: An internal error occurred while finding or creating the subject.
 */
subjectRouter.get(
  "/subjects/find_create/:name",
  SubjectController.findOrCreateSubject
);

export default subjectRouter;
