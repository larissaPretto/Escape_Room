import PuzzleRepository from "../models/repositories/PuzzleRepository";
import { Puzzle } from "../models/entities/Puzzle";

const getAllPuzzles = async (): Promise<Puzzle[]> => {
  return await PuzzleRepository.findAll();
};

const getPuzzleById = async (id: number): Promise<Puzzle | null> => {
  return await PuzzleRepository.findById(id);
};

export default {
  getAllPuzzles,
  getPuzzleById,
};
