import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import UserService from '../services/UserService';

export const validateData = [
  body('username')
    .notEmpty().withMessage('Username é obrigatório')
    .isLength({ max: 30 }).withMessage('Username deve ter no máximo 30 caracteres')
    .custom(async (username) => {
      const user = await UserService.getUserByUsername(username);
      if (user) {
        throw new Error('Username já está em uso');
      }
    }),
  body('email')
    .notEmpty().withMessage('O campo de e-mail é obrigatório')
    .isEmail().withMessage('Digite um e-mail válido')
    .custom(async (email) => {
      const user = await UserService.getUserByEmail(email);
      if (user) {
        throw new Error('E-mail já está em uso');
      }
    }),
  body('password')
    .notEmpty().withMessage('O campo de senha é obrigatório')
    .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
  body('creator')
    .notEmpty().withMessage('O campo creator é obrigatório')
];

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
