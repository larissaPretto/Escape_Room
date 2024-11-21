import ScenarioRepository from "../models/repositories/ScenarioRepository";

const getAllScenarios = async () => {
  try {
    return await ScenarioRepository.findAll();
  } catch (error) {
    throw new Error("Failed to fetch scenarios. Please try again later.");
  }
};

export default {
  getAllScenarios,
};
