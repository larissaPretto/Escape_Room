import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret_key";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token inválido ou expirado
      }

      (req as any).user = user; // Anexa o usuário ao objeto de solicitação
      next();
    });
  } else {
    res.sendStatus(401); // Nenhum token fornecido
  }
};
