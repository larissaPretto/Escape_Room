import ArtifactRepository from "../models/repositories/ArtifactRepository";
import { Artifact } from "../models/entities/Artifact";

const getAllArtifacts = async (): Promise<Artifact[]> => {
  try {
    return await ArtifactRepository.findAll();
  } catch (error) {
    throw new Error("Failed to retrieve artifact. Please try again later.");
  }
};

const getArtifactById = async (id: number): Promise<Artifact | null> => {
  return await ArtifactRepository.findById(id);
};

const createArtifact = async (
  artifactData: Partial<Artifact>
): Promise<Artifact> => {
  return await ArtifactRepository.createArtifact(artifactData);
};

const updateArtifact = async (
  id: number,
  artifactData: Partial<Artifact>
): Promise<Artifact | null> => {
  return await ArtifactRepository.updateArtifact(id, artifactData);
};

const deleteArtifact = async (id: number): Promise<void> => {
  return await ArtifactRepository.deleteArtifact(id);
};

export default {
  getAllArtifacts,
  getArtifactById,
  createArtifact,
  updateArtifact,
  deleteArtifact,
};
