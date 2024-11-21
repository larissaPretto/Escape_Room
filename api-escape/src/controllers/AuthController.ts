import { Request, Response } from "express";
import AuthService from "../services/AuthService";

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const loginResponse = await AuthService.login(email, password);

    if (loginResponse) {
      return res.status(200).json(loginResponse);
    } else {
      return res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "No token provided." });
    }
    res.clearCookie("token");
    //await AuthService.logout(token);
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export default {
  login,
  logout,
};
