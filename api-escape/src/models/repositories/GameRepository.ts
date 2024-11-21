import dataSource from "../../config/orm";
import { Game } from "../entities/Game";

const gameRepository = dataSource.getRepository(Game);

const findById = async (id: number): Promise<Game | null> => {
  try {
    return await gameRepository.findOne({
      where: { idGame: id },
      relations: ["room", "users"],
    });
  } catch (error) {
    throw new Error(
      `Could not fetch game with id "${id}". Please try again later.`
    );
  }
};

const updateWin = async (id: number): Promise<Game | null> => {
  try {
    const game = await findById(id);
    if (!game) {
      throw new Error(`Game with id "${id}" not found.`);
    }
    game.win = true;
    return await gameRepository.save(game);
  } catch (error) {
    throw new Error(
      `Failed to update win for game with id "${id}". Please try again later.`
    );
  }
};

const createGame = (gameData: Partial<Game>): Game => {
  return gameRepository.create(gameData);
};

const saveGame = async (game: Game): Promise<Game> => {
  return await gameRepository.save(game);
};

export default { findById, updateWin, createGame, saveGame };
