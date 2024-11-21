import dataSource from "../../config/orm";
import { Player } from "../entities/Player";

const playerRepository = dataSource.getRepository(Player);

const findByUsername = async (username: string): Promise<Player | null> => {
  return await playerRepository.findOne({
    where: { username },
  });
};

const createPlayer = async (data: Partial<Player>): Promise<Player> => {
  const player = playerRepository.create(data);
  return await playerRepository.save(player);
};

const findById = async (id: number): Promise<Player | null> => {
  try {
    const user = await playerRepository.findOne({
      where: {
        idPlayer: id,
      },
    });
    return user;
  } catch (error) {
    throw new Error(
      `Could not fetch player with id "${id}". Please try again later.`
    );
  }
};

export default {
  findByUsername,
  createPlayer,
  findById,
};
