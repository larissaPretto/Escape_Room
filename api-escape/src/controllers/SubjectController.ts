import { Request, Response } from "express";
import SubjectService from "../services/SubjectService";

const getAllSubjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const subject = await SubjectService.getAllSubjects();
    return res.status(200).json(subject);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch subject." });
  }
};

const getSubjectById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }
    const subject = await SubjectService.getSubjectById(id);
    if (subject) {
      return res.status(200).json(subject);
    } else {
      return res
        .status(404)
        .json({ message: `Subject with id "${id}" not found.` });
    }
  } catch (error) {
    const id = parseInt(req.params.id, 10);
    return res.status(500).json({
      message: `An internal error occurred while retrieving subject with id "${id}".`,
    });
  }
};

const createSubject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.body;
    const newSubject = await SubjectService.createSubject({ name });
    return res.status(201).json(newSubject);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create subject." });
  }
};

const updateSubject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }

    const { name } = req.body;
    const updatedSubject = await SubjectService.updateSubject(id, { name });
    if (updatedSubject) {
      return res.status(200).json(updatedSubject);
    } else {
      return res
        .status(404)
        .json({ message: `Subject with id "${id}" not found.` });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update subject." });
  }
};

const deleteSubject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid subject ID" });
    }

    const result = await SubjectService.deleteSubject(id);
    if (result) {
      return res.status(204).send();
    } else {
      return res
        .status(404)
        .json({ message: `Subject with id "${id}" not found.` });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete subject." });
  }
};

const findOrCreateSubject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: "Subject name is required" });
    }

    const subject = await SubjectService.findOrCreateSubject(name);
    return res.status(200).json(subject);
  } catch (error) {
    return res.status(500).json({ error: "Failed to find or create subject." });
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
