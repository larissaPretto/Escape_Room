import { Request, Response } from "express";
import ContentService from "../services/ContentService";

const getAllContents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const content = await ContentService.getAllContents();
    return res.status(200).json(content);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch content." });
  }
};

const getContentById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid content ID" });
    }
    const content = await ContentService.getContentById(id);
    if (content) {
      return res.status(200).json(content);
    } else {
      return res
        .status(404)
        .json({ message: `Content with id "${id}" not found.` });
    }
  } catch (error) {
    const id = parseInt(req.params.id, 10);
    return res.status(500).json({
      message: `An internal error occurred while retrieving content with id "${id}".`,
    });
  }
};

const updateContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedData = req.body;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid content ID" });
    }
    const updatedContent = await ContentService.updateContent(id, updatedData);
    return res.status(200).json(updatedContent);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Failed to update content: ${(error as Error).message}` });
  }
};

const deleteContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid content ID" });
    }
    await ContentService.deleteContent(id);
    return res.status(204).send();
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Failed to delete content: ${(error as Error).message}` });
  }
};

const findOrCreateContent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ message: "Content name is required" });
    }

    const content = await ContentService.findOrCreateContent(name);
    return res.status(200).json(content);
  } catch (error) {
    return res.status(500).json({ error: "Failed to find or create content." });
  }
};

export default {
  getAllContents,
  getContentById,
  updateContent,
  deleteContent,
  findOrCreateContent,
};
