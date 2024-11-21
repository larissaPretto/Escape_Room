import { Request, Response } from "express";
import ArtifactService from "../services/ArtifactService";

const getAllArtifacts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const artifacts = await ArtifactService.getAllArtifacts();
    return res.status(200).json(artifacts);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch artifacts." });
  }
};

const getArtifactById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid artifact ID" });
    }
    const artifact = await ArtifactService.getArtifactById(id);
    if (artifact) {
      return res.status(200).json(artifact);
    } else {
      return res
        .status(404)
        .json({ message: `Artifact with id "${id}" not found.` });
    }
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred." });
  }
};

const createArtifact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const artifactData = req.body;
    const newArtifact = await ArtifactService.createArtifact(artifactData);
    return res.status(201).json(newArtifact);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create artifact." });
  }
};

const updateArtifact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid artifact ID" });
    }
    const artifactData = req.body;
    const updatedArtifact = await ArtifactService.updateArtifact(
      id,
      artifactData
    );
    if (updatedArtifact) {
      return res.status(200).json(updatedArtifact);
    } else {
      return res
        .status(404)
        .json({ message: `Artifact with id "${id}" not found.` });
    }
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred." });
  }
};

const deleteArtifact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid artifact ID" });
    }
    await ArtifactService.deleteArtifact(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred." });
  }
};

export default {
  getAllArtifacts,
  getArtifactById,
  createArtifact,
  updateArtifact,
  deleteArtifact,
};
