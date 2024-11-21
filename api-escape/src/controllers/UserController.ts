import { Request, Response } from "express";
import UserService from "../services/UserService";

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch users." });
  }
};

const getUserByUsername = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const username = req.params.username;
    const user = await UserService.getUserByUsername(username);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res
        .status(404)
        .json({ message: `User with username "${username}" not found.` });
    }
  } catch (error) {
    const username = req.params.username;
    return res.status(500).json({
      message: `An internal error occurred while retrieving user with username "${username}".`,
    });
  }
};

const getUserByEmail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const email = req.params.email;
    const user = await UserService.getUserByEmail(email);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user by email" });
  }
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }
    const user = await UserService.getUserById(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user by id" });
  }
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password, email, creator } = req.body;
    console.log(req.body);
    const newUser = await UserService.createUser({
      username,
      password,
      email,
      creator,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ error: "An internal error occurred while creating the user." });
  }
};

//player
const findOrCreatePlayer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Username is required." });
    }

    const player = await UserService.findOrCreate(username);

    return res.status(200).json({
      idPlayer: player.idPlayer,
      username: player.username,
    });
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred." });
  }
};

export default {
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  getUserById,
  createUser,
  findOrCreatePlayer,
};
