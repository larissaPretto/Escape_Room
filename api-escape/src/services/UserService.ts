import UserRepository from "../models/repositories/UserRepository";
import { User } from "../models/entities/User";
import PlayerRepository from "../models/repositories/PlayerRepository";
import bcrypt from "bcryptjs";
const saltRounds = 10;

const getAllUsers = async (): Promise<User[]> => {
  try {
    return await UserRepository.findAll();
  } catch (error) {
    throw new Error("Failed to retrieve users. Please try again later.");
  }
};

const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    return await UserRepository.findByUsername(username);
  } catch (error) {
    throw new Error(
      `Failed to retrieve user with username "${username}". Please try again later.`
    );
  }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await UserRepository.findByEmail(email);
  } catch (error) {
    throw new Error("Erro ao buscar o usuário pelo e-mail.");
  }
};

const getUserById = async (id: number): Promise<User | null> => {
  try {
    return await UserRepository.findById(id);
  } catch (error) {
    throw new Error(
      `Failed to retrieve user with id "${id}". Please try again later.`
    );
  }
};

const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }
    return UserRepository.createUser(userData);
  } catch (error) {
    throw new Error("Failed to create user. Please try again later.");
  }
};

//player service
const findOrCreate = async (username: string) => {
  let player = await PlayerRepository.findByUsername(username);

  if (!player) {
    player = await PlayerRepository.createPlayer({ username });
  }

  return player;
};

export default {
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  getUserById,
  createUser,
  findOrCreate,
};
