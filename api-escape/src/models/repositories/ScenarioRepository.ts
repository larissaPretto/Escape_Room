import dataSource from "../../config/orm";
import { Scenario } from "../entities/Scenario";

const scenarioRepository = dataSource.getRepository(Scenario);

const findById = async (id: number): Promise<Scenario | null> => {
  try {
    return await scenarioRepository.findOne({ where: { idScenario: id } });
  } catch (error) {
    throw new Error("An error occurred while finding the Scenario.");
  }
};

const findAll = async (): Promise<Scenario[]> => {
  try {
    return await scenarioRepository.find();
  } catch (error) {
    throw new Error("An error occurred while fetching the scenarios.");
  }
};

export default {
  findById,
  findAll,
};
