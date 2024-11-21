import { Request, Response } from "express";
import PuzzleService from "../services/PuzzleService";

const getAllPuzzles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const puzzles = await PuzzleService.getAllPuzzles();
    return res.status(200).json(puzzles);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch puzzles." });
  }
};

const getPuzzleById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid puzzle ID" });
    }
    const puzzle = await PuzzleService.getPuzzleById(id);
    if (puzzle) {
      return res.status(200).json(puzzle);
    } else {
      return res
        .status(404)
        .json({ message: `Puzzle with id "${id}" not found.` });
    }
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred." });
  }
};

export default {
  getAllPuzzles,
  getPuzzleById,
};
