import dataSource from "../../config/orm";
import { Artifact } from "../entities/Artifact";

const artifactRepository = dataSource.getRepository(Artifact);

const findAll = async (): Promise<Artifact[]> => {
  try {
    return await artifactRepository.find({ relations: ["components"] });
  } catch (error) {
    throw new Error("Failed to retrieve artifacts. Please try again later.");
  }
};

const findById = async (id: number): Promise<Artifact | null> => {
  try {
    return await artifactRepository.findOne({
      where: { idArtifact: id },
      relations: ["components"],
    });
  } catch (error) {
    throw new Error(
      `Could not fetch artifact with id "${id}". Please try again later.`
    );
  }
};

const createArtifact = async (
  artifactData: Partial<Artifact>
): Promise<Artifact> => {
  try {
    const newArtifact = artifactRepository.create(artifactData);
    return await artifactRepository.save(newArtifact);
  } catch (error) {
    throw new Error("Failed to create artifact. Please try again later.");
  }
};

const updateArtifact = async (
  id: number,
  artifactData: Partial<Artifact>
): Promise<Artifact | null> => {
  try {
    const existingArtifact = await findById(id);
    if (!existingArtifact) {
      throw new Error("Artifact not found");
    }
    const updatedArtifact = artifactRepository.merge(
      existingArtifact,
      artifactData
    );
    return await artifactRepository.save(updatedArtifact);
  } catch (error) {
    throw new Error(
      `Failed to update artifact with id "${id}". Please try again later.`
    );
  }
};

const deleteArtifact = async (id: number): Promise<void> => {
  try {
    const existingArtifact = await findById(id);
    if (!existingArtifact) {
      throw new Error("Artifact not found");
    }
    await artifactRepository.remove(existingArtifact);
  } catch (error) {
    throw new Error(
      `Failed to delete artifact with id "${id}". Please try again later.`
    );
  }
};

export default {
  findAll,
  findById,
  createArtifact,
  updateArtifact,
  deleteArtifact,
};
