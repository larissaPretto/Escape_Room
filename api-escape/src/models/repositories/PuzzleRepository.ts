import { In } from "typeorm";
import dataSource from "../../config/orm";
import { Puzzle } from "../entities/Puzzle";

const puzzleRepository = dataSource.getRepository(Puzzle);

const findAll = async (): Promise<Puzzle[]> => {
  try {
    return await puzzleRepository.find({ relations: ["artifacts"] });
  } catch (error) {
    throw new Error("Failed to retrieve puzzles. Please try again later.");
  }
};

const findById = async (id: number): Promise<Puzzle | null> => {
  try {
    return await puzzleRepository.findOne({
      where: { idPuzzle: id },
      relations: ["artifacts"],
    });
  } catch (error) {
    throw new Error(
      `Could not fetch puzzle with id "${id}". Please try again later.`
    );
  }
};

const findByIds = async (ids: number[]): Promise<Puzzle[]> => {
  try {
    const puzzles = await puzzleRepository.findBy({
      idPuzzle: In(ids),
    });
    return puzzles;
  } catch (error) {
    throw new Error(
      `Could not fetch content for provided IDs. Please try again later.`
    );
  }
};

const deletePuzzle = async (id: number): Promise<void> => {
  try {
    const existingPuzzle = await findById(id);
    if (!existingPuzzle) {
      throw new Error("Puzzle not found");
    }
    await puzzleRepository.remove(existingPuzzle);
  } catch (error) {
    throw new Error(
      `Failed to delete puzzle with id "${id}". Please try again later.`
    );
  }
};

export default {
  findAll,
  findById,
  deletePuzzle,
  findByIds,
};
