import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserRepository from "../models/repositories/UserRepository";
import { User } from "../models/entities/User";

const secret = process.env.JWT_SECRET || "secret_key"; // Use uma chave secreta segura em produção

interface LoginResponse {
  token: string;
  user: User;
}

const login = async (
  email: string,
  password: string
): Promise<LoginResponse | null> => {
  try {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error(
        "User not found. email: " + email + " - password: " + password
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign({ userId: user.idUser }, secret, {
      expiresIn: "1h",
    });

    return { token, user };
  } catch (error) {
    throw new Error("Login failed.");
  }
};

export default {
  login,
};
