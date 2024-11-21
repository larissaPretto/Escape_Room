import { Request, Response } from "express";
import ScenarioService from "../services/ScenarioService";

const getAllScenarios = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const scenarios = await ScenarioService.getAllScenarios();

    if (scenarios && scenarios.length > 0) {
      const response = scenarios.map((scenario) => ({
        idScenario: scenario.idScenario,
        name: scenario.name,
        description: scenario.description,
        img: scenario.img,
      }));

      return res.status(200).json({ scenarios: response });
    } else {
      return res.status(404).json({ message: "No scenarios found." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch scenarios." });
  }
};

export default {
  getAllScenarios,
};
