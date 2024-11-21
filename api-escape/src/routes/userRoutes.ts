import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";
import {
  validateData,
  validationMiddleware,
} from "../middlewares/validationMiddleware";

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: manage users
 */

/**
 * @swagger
 * tags:
 *   name: Register and Login
 *   description: manage registration and login functions
 */

/**
 * @swagger
 * /users/all:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/users/all", UserController.getAllUsers);

/**
 * @swagger
 * /users/username/{username}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a single user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: An internal error occurred while retrieving the user.
 */
userRouter.get("/users/username/:username", UserController.getUserByUsername);

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a user by email
 *     description: Retrieve a single user by email.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving user by email
 */
userRouter.get("/users/email/:email", UserController.getUserByEmail);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a single user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The requested user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *       500:
 *         description: An internal error occurred while retrieving the user.
 */
userRouter.get("/users/:id", UserController.getUserById);

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Register and Login]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post(
  "/register",
  validateData,
  validationMiddleware,
  UserController.createUser
);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Register and Login]
 *     summary: User login
 *     description: Log in a user by providing their username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "teste@gmail.com"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid username or password."
 *       500:
 *         description: Login failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Login failed.."
 */
userRouter.post("/login", AuthController.login);

/**
 * @swagger
 * /logout:
 *   post:
 *     tags: [Register and Login]
 *     summary: User logout
 *     description: Log out a user by providing their JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The JWT token of the user.
 */
userRouter.post("/logout", AuthController.logout);

/**
 * @swagger
 * /players/find_or_create:
 *   post:
 *     tags: [Users]
 *     summary: Find or create a player
 *     description: Find or create a player by username
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the player.
 *                 example: "player1"
 *     responses:
 *       200:
 *         description: Player found or created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       500:
 *         description: An internal error occurred while finding or creating the player.
 */
userRouter.post("/players/find_or_create", UserController.findOrCreatePlayer);

export default userRouter;
