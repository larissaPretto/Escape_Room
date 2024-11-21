import SubjectRepository from "../models/repositories/SubjectRepository";
import { Subject } from "../models/entities/Subject";

const getAllSubjects = async (): Promise<Subject[]> => {
  try {
    return await SubjectRepository.findAll();
  } catch (error) {
    throw new Error("Failed to retrieve subject. Please try again later.");
  }
};

const getSubjectById = async (id: number): Promise<Subject | null> => {
  try {
    return await SubjectRepository.findById(id);
  } catch (error) {
    throw new Error(
      `Failed to retrieve user with id "${id}". Please try again later.`
    );
  }
};

const createSubject = async (
  subjectData: Partial<Subject>
): Promise<Subject> => {
  try {
    return await SubjectRepository.createSubject(subjectData);
  } catch (error) {
    throw new Error("Failed to create subject. Please try again later.");
  }
};

const updateSubject = async (
  id: number,
  subjectData: Partial<Subject>
): Promise<Subject | null> => {
  try {
    return await SubjectRepository.updateSubject(id, subjectData);
  } catch (error) {
    throw new Error(
      `Failed to update subject with id "${id}". Please try again later.`
    );
  }
};

const deleteSubject = async (id: number): Promise<boolean> => {
  try {
    return await SubjectRepository.deleteSubject(id);
  } catch (error) {
    throw new Error(
      `Failed to delete subject with id "${id}". Please try again later.`
    );
  }
};

const findOrCreateSubject = async (name: string): Promise<Subject> => {
  try {
    let subject = await SubjectRepository.findByName(name);
    if (!subject) {
      subject = await SubjectRepository.createSubject({ name });
    }
    return subject;
  } catch (error) {
    throw new Error("Failed to find or create subject.");
  }
};

export default {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  findOrCreateSubject,
};
