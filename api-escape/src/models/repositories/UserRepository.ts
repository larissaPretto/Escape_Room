import { ILike } from "typeorm";
import dataSource from "../../config/orm";
import { User } from "../entities/User";

const userRepository = dataSource.getRepository(User);

const findAll = async (): Promise<User[]> => {
  try {
    const users = await userRepository.find();
    return users;
  } catch (error) {
    throw new Error(
      "An error occurred while fetching users. Please try again later."
    );
  }
};

const findByUsername = async (username: string): Promise<User | null> => {
  try {
    const user = await userRepository.findOne({
      where: {
        username: ILike(username),
      },
    });
    return user;
  } catch (error) {
    throw new Error(
      `Could not fetch user with username "${username}". Please try again later.`
    );
  }
};

const findByEmail = async (email: string): Promise<User | null> => {
  try {
    return await userRepository.findOne({
      where: { email: ILike(email), creator: true },
    });
  } catch (error) {
    throw new Error(
      `Could not fetch user with e-mail "${email}". Please try again later.`
    );
  }
};

const findById = async (id: number): Promise<User | null> => {
  try {
    const user = await userRepository.findOne({
      where: {
        idUser: id,
      },
    });
    return user;
  } catch (error) {
    throw new Error(
      `Could not fetch user with id "${id}". Please try again later.`
    );
  }
};

const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);
    return newUser;
  } catch (error) {
    throw new Error(
      "An error occurred while creating the user. Please try again later."
    );
  }
};

export default {
  findAll,
  findByUsername,
  findByEmail,
  findById,
  createUser,
};
