import ContentRepository from "../models/repositories/ContentRepository";
import { Content } from "../models/entities/Content";

const getAllContents = async (): Promise<Content[]> => {
  try {
    return await ContentRepository.findAll();
  } catch (error) {
    throw new Error("Failed to retrieve content. Please try again later.");
  }
};

const getContentById = async (id: number): Promise<Content | null> => {
  try {
    return await ContentRepository.findById(id);
  } catch (error) {
    throw new Error(
      `Failed to retrieve content with id "${id}". Please try again later.`
    );
  }
};

const updateContent = async (
  id: number,
  updatedData: Partial<Content>
): Promise<Content> => {
  try {
    return await ContentRepository.updateContent(id, updatedData);
  } catch (error) {
    throw new Error(
      `Failed to update content with id "${id}". Please try again later.`
    );
  }
};

const deleteContent = async (id: number): Promise<void> => {
  try {
    return await ContentRepository.deleteContent(id);
  } catch (error) {
    throw new Error(
      `Failed to delete content with id "${id}". Please try again later.`
    );
  }
};

const findOrCreateContent = async (name: string): Promise<Content> => {
  try {
    let content = await ContentRepository.findByName(name);
    if (!content) {
      content = await ContentRepository.createContent({ name });
    }
    return content;
  } catch (error) {
    throw new Error("Failed to find or create content.");
  }
};

export default {
  getAllContents,
  getContentById,
  updateContent,
  deleteContent,
  findOrCreateContent,
};
