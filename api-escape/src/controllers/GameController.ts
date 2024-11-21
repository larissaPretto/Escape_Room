import { Request, Response } from "express";
import GameService from "../services/GameService";
import { Room } from "../models/entities/Room";

const createGame = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idRoom, idPlayer } = req.body;

    if (!idRoom || !idPlayer) {
      return res
        .status(400)
        .json({ message: "idRoom and idPlayer are required." });
    }

    const game = await GameService.createGame(idRoom, idPlayer);

    if (!game) {
      return res.status(404).json({ message: "Failed to create game." });
    }

    const response = {
      win: game.win,
      timeEnd: game.timeEnd,
      dataGame: game.dataGame,
      idRoom: game.room.idRoom,
      idPlayer: game.player.idPlayer,
      username: game.player.username,
    };

    return res.status(201).json(response);
  } catch (error: any) {
    console.error(`Error creating game: ${error.message}`);
    return res
      .status(500)
      .json({ message: error.message || "An internal error occurred." });
  }
};

export default {
  createGame,
};
