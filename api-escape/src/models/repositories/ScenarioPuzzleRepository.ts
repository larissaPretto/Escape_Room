import dataSource from "../../config/orm";
import { ScenarioPuzzle } from "../entities/ScenarioPuzzle";

const scenarioPuzzleRepository = dataSource.getRepository(ScenarioPuzzle);

// Função para criar um novo ScenarioPuzzle
const createScenarioPuzzle = async (
  scenarioPuzzleData: Partial<ScenarioPuzzle>
): Promise<ScenarioPuzzle> => {
  try {
    const newScenarioPuzzle =
      scenarioPuzzleRepository.create(scenarioPuzzleData); // Cria uma nova instância
    await scenarioPuzzleRepository.save(newScenarioPuzzle); // Salva a nova instância no banco de dados
    return newScenarioPuzzle; // Retorna a nova instância
  } catch (error) {
    throw new Error("An error occurred while creating the ScenarioPuzzle.");
  }
};

const findByScenarioId = async (
  scenarioId: number
): Promise<ScenarioPuzzle[]> => {
  try {
    return await scenarioPuzzleRepository.find({
      where: { scenario: { idScenario: scenarioId } },
      relations: ["puzzle"],
    });
  } catch (error) {
    throw new Error("An error occurred while fetching scenario puzzles.");
  }
};

export default {
  createScenarioPuzzle,
  findByScenarioId,
};
