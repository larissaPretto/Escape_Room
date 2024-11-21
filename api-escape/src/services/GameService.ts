import GameRepository from "../models/repositories/GameRepository";
import { Game } from "../models/entities/Game";
import RoomRepository from "../models/repositories/RoomRepository";
import UserRepository from "../models/repositories/UserRepository";
import PlayerRepository from "../models/repositories/PlayerRepository";

const createGame = async (idRoom: number, idPlayer: number): Promise<Game> => {
  const player = await PlayerRepository.findById(idPlayer);
  if (!player) throw new Error(`Player with id ${idPlayer} not found.`);

  const room = await RoomRepository.findRoomById(idRoom);
  if (!room) throw new Error(`Room with id ${idRoom} not found.`);

  const newGame = GameRepository.createGame({
    room,
    player,
    win: false, // Valor inicial
    timeEnd: "00:00:00", // Valor inicial
    dataGame: new Date(), // Data atual
  });

  return await GameRepository.saveGame(newGame);
};

const getGameById = async (id: number): Promise<Game | null> => {
  return await GameRepository.findById(id);
};

const updateWin = async (id: number): Promise<Game | null> => {
  return await GameRepository.updateWin(id);
};

export default {
  getGameById,
  updateWin,
  createGame,
};
