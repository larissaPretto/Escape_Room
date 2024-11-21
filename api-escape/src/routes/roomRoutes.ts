import e, { Router } from "express";
import RoomController from "../controllers/RoomController";

const roomRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Rooms
 *  description: manage rooms
 */

/**
 * @swagger
 * /rooms/all:
 *   get:
 *     tags: [Rooms]
 *     summary: Retrieve a list of rooms
 *     description: Retrieve a list of rooms.
 *     responses:
 *       200:
 *         description: A list of rooms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       500:
 *         description: Error retrieving rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to fetch rooms."
 */
roomRouter.get("/rooms/all", RoomController.getAllRooms);

/**
 * @swagger
 * /rooms/code/{code}:
 *   get:
 *     tags: [Rooms]
 *     summary: Retrieve a single room by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested room.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found.
 *       500:
 *         description: An internal error occurred while retrieving the room.
 */
roomRouter.get("/rooms/code/:code", RoomController.getRoomByCode);

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     tags: [Rooms]
 *     summary: Retrieve a single room by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The requested room.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found.
 *       500:
 *         description: An internal error occurred while retrieving the room.
 */
//roomRouter.get("/rooms/:id", RoomController.getRoomById);

/**
 * @swagger
 * /rooms:
 *   post:
 *     tags: [Rooms]
 *     summary: Create a new room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               time:
 *                 type: string
 *               visibility:
 *                 type: boolean
 *               active:
 *                 type: boolean
 *               subjectIds:
 *                 type: array
 *                 items:
 *                   type: number
 *               scenarioId:
 *                 type: number
 *               userId:
 *                 type: number
 *               contentIds:
 *                 type: array
 *                 items:
 *                   type: number
 *
 *     responses:
 *       201:
 *         description: Room created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Room not found."
 */
roomRouter.post("/rooms", RoomController.createRoom);

/**
 * @swagger
 * /like:
 *   post:
 *     summary: Like a room
 *     description: Allows a user to like a room.
 *     tags:
 *       - Rooms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: integer
 *                 description: ID of the user liking the room.
 *                 example: 1
 *               idRoom:
 *                 type: integer
 *                 description: ID of the room being liked.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully liked the room.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Invalid userId or roomId.
 *       500:
 *         description: Internal server error.
 */
//roomRouter.post("/like", RoomController.likeRoom);

/**
 * @swagger
 * /rooms/filter/order:
 *   get:
 *     tags: [Rooms]
 *     summary: Get rooms with filters and ordering
 *     parameters:
 *       - in: query
 *         name: subjectId
 *         schema:
 *           type: integer
 *         description: ID of the subject to filter by
 *         required: false
 *       - in: query
 *         name: contentId
 *         schema:
 *           type: integer
 *         description: Filter by content ID
 *         required: false
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering rooms
 *         required: false
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering rooms
 *         required: false
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [totalLike, dataCreation]
 *         description: Order by "totalLike" or "dataCreation"
 *         required: false
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       500:
 *         description: Internal server error.
 */
roomRouter.get("/rooms/filter/order", RoomController.getAllRoomsWithFilters);

/**
 * @swagger
 * /rooms/lastRoom/{userId}:
 *   get:
 *     tags: [Rooms]
 *     summary: Get the last room created by a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The last room created by the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       500:
 *         description: Internal server error.
 */
roomRouter.get("/rooms/lastRoom/:userId", RoomController.getLastRoomByUser);

/**
 * @swagger
 * /rooms/user/{userId}:
 *   get:
 *     tags: [Rooms]
 *     summary: Get the user's rooms
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Users rooms
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       500:
 *         description: Internal server error.
 */
roomRouter.get("/rooms/user/:userId", RoomController.getRoomsByUserId);

/**
 * @swagger
 * /rooms/{roomId}:
 *   get:
 *     tags: [Rooms]
 *     summary: Get the last room created by a user
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The last room created by the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       500:
 *         description: Internal server error.
 */
roomRouter.get("/rooms/:roomId", RoomController.getRoomById);

/**
 * @swagger
 * /rooms/puzzles/{idRoomPuzzle}:
 *   put:
 *     tags: [Rooms]
 *     summary: Update a puzzle's answer and its artifacts' values
 *     parameters:
 *       - in: path
 *         name: idRoomPuzzle
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the RoomPuzzle to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 type: string
 *                 description: The answer to the puzzle
 *               artifacts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idRoomArtifact:
 *                       type: integer
 *                       description: The ID of the artifact to update
 *                     value:
 *                       type: string
 *                       description: The new value for the artifact
 *     responses:
 *       200:
 *         description: Puzzle and artifacts updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Puzzle and artifacts updated successfully
 *       400:
 *         description: Invalid input, object invalid
 *       404:
 *         description: Puzzle or artifacts not found
 *       500:
 *         description: Internal server error
 */
roomRouter.put("/rooms/puzzles", RoomController.updatePuzzles);

export default roomRouter;
