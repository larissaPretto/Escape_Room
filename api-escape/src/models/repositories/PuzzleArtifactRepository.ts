import { In } from "typeorm";
import dataSource from "../../config/orm";
import { PuzzleArtifact } from "../entities/PuzzleArtifact";

const puzzleArtifactRepository = dataSource.getRepository(PuzzleArtifact);

const findByPuzzleId = async (puzzleId: number): Promise<PuzzleArtifact[]> => {
  try {
    return await puzzleArtifactRepository.find({
      where: { puzzle: { idPuzzle: puzzleId } },
      relations: ["artifact"],
    });
  } catch (error) {
    throw new Error("An error occurred while fetching puzzle artifacts.");
  }
};

const findByPuzzleIds = async (
  puzzleIds: number[]
): Promise<PuzzleArtifact[]> => {
  try {
    return await puzzleArtifactRepository.find({
      where: {
        puzzle: { idPuzzle: In(puzzleIds) }, // Usa o operador 'In' para buscar múltiplos IDs
      },
      relations: ["artifact"], // Inclua a relação com Artifact se necessário
    });
  } catch (error) {
    throw new Error("An error occurred while fetching puzzle artifacts.");
  }
};

export default {
  findByPuzzleId,
  findByPuzzleIds,
};
