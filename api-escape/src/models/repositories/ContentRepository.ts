import dataSource from "../../config/orm";
import { Content } from "../entities/Content";
import { In } from "typeorm";

const contentRepository = dataSource.getRepository(Content);

const findAll = async (): Promise<Content[]> => {
  try {
    const content = await contentRepository.find();
    return content;
  } catch (error) {
    throw new Error(
      "An error occurred while fetching content. Please try again later."
    );
  }
};

const findById = async (id: number): Promise<Content | null> => {
  try {
    const content = await contentRepository.findOne({
      where: {
        idContent: id,
      },
    });
    return content;
  } catch (error) {
    throw new Error(
      `Could not fetch content with id "${id}". Please try again later.`
    );
  }
};

const findByIds = async (ids: number[]): Promise<Content[]> => {
  try {
    const contents = await contentRepository.findBy({
      idContent: In(ids),
    });
    return contents;
  } catch (error) {
    throw new Error(
      `Could not fetch content for provided IDs. Please try again later.`
    );
  }
};

const updateContent = async (
  id: number,
  updatedData: Partial<Content>
): Promise<Content> => {
  try {
    const content = await contentRepository.findOne({
      where: { idContent: id },
    });
    if (!content) {
      throw new Error(`Content with id "${id}" not found.`);
    }
    Object.assign(content, updatedData);
    return await contentRepository.save(content);
  } catch (error) {
    throw new Error(
      `Could not update content with id "${id}". Please try again later.`
    );
  }
};

const deleteContent = async (id: number): Promise<void> => {
  try {
    const content = await contentRepository.findOne({
      where: { idContent: id },
    });
    if (!content) {
      throw new Error(`Content with id "${id}" not found.`);
    }
    await contentRepository.remove(content);
  } catch (error) {
    throw new Error(
      `Could not delete content with id "${id}". Please try again later.`
    );
  }
};

const findByName = async (name: string): Promise<Content | null> => {
  try {
    return await contentRepository.findOne({ where: { name } });
  } catch (error) {
    throw new Error(
      `Failed to fetch content with name "${name}". Please try again later.`
    );
  }
};

const createContent = async (data: { name: string }): Promise<Content> => {
  try {
    const content = contentRepository.create(data);
    return await contentRepository.save(content);
  } catch (error) {
    throw new Error("Failed to create content.");
  }
};
export default {
  findAll,
  findById,
  findByIds,
  updateContent,
  deleteContent,
  createContent,
  findByName,
};
