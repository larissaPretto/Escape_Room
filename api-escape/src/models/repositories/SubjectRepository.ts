import dataSource from "../../config/orm";
import { Subject } from "../entities/Subject";

const subjectRepository = dataSource.getRepository(Subject);

const findAll = async (): Promise<Subject[]> => {
  try {
    const subject = await subjectRepository.find();
    return subject;
  } catch (error) {
    throw new Error(
      "An error occurred while fetching subject. Please try again later."
    );
  }
};

const findById = async (id: number): Promise<Subject | null> => {
  try {
    const subject = await subjectRepository.findOne({
      where: {
        idSubject: id,
      },
    });
    return subject;
  } catch (error) {
    throw new Error(
      `Could not fetch subject with id "${id}". Please try again later.`
    );
  }
};

const createSubject = async (
  subjectData: Partial<Subject>
): Promise<Subject> => {
  try {
    const subject = subjectRepository.create(subjectData);
    return await subjectRepository.save(subject);
  } catch (error) {
    throw new Error("Failed to create subject. Please try again later.");
  }
};

const updateSubject = async (
  id: number,
  subjectData: Partial<Subject>
): Promise<Subject | null> => {
  try {
    await subjectRepository.update(id, subjectData);
    return await findById(id);
  } catch (error) {
    throw new Error(
      `Failed to update subject with id "${id}". Please try again later.`
    );
  }
};

const deleteSubject = async (id: number): Promise<boolean> => {
  try {
    const result = await subjectRepository.delete(id);
    return result?.affected !== undefined && result?.affected! > 0;
  } catch (error) {
    throw new Error(
      `Failed to delete subject with id "${id}". Please try again later.`
    );
  }
};

const findByName = async (name: string): Promise<Subject | null> => {
  try {
    return await subjectRepository.findOne({ where: { name } });
  } catch (error) {
    throw new Error(
      `Failed to fetch subject with name "${name}". Please try again later.`
    );
  }
};

const findByIds = async (ids: number[]): Promise<Subject[]> => {
  try {
    return await subjectRepository.findByIds(ids);
  } catch (error) {
    throw new Error("An error occurred while finding subjects.");
  }
};

export default {
  findAll,
  findById,
  createSubject,
  updateSubject,
  deleteSubject,
  findByName,
  findByIds,
};
