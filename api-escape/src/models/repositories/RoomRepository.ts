import { ILike } from "typeorm";
import dataSource from "../../config/orm";
import { Room } from "../entities/Room";

const roomRepository = dataSource.getRepository(Room);

const findAll = async (options: { relations: string[] }): Promise<Room[]> => {
  try {
    return await roomRepository.find({
      relations: options.relations,
      order: { name: "ASC" }, // Ordena os rooms por nome, se necessário
    });
  } catch (error) {
    throw new Error("An error occurred while fetching rooms.");
  }
};

const findByCode = async (
  code: string,
  options: { relations: string[] }
): Promise<Room | null> => {
  try {
    const room = await roomRepository.findOne({
      where: {
        code: ILike(code),
      },
      relations: options.relations,
    });
    return room;
  } catch (error) {
    throw new Error(
      `Could not fetch room with code "${code}". Please try again later.`
    );
  }
};

const findById = async (
  id: number,
  p0: { relations: string[] }
): Promise<Room | null> => {
  try {
    const room = await roomRepository.findOne({
      where: {
        idRoom: id,
      },
      relations: [
        "subject",
        "user",
        "contents",
        "roomPuzzles",
        "roomPuzzles.puzzle",
        "roomPuzzles.puzzle.puzzleArtifacts",
        "roomPuzzles.puzzle.puzzleArtifacts.artifact",
      ],
    });
    return room;
  } catch (error) {
    throw new Error(
      `Could not fetch room with id "${id}". Please try again later.`
    );
  }
};

const findByIdTbLike = async (id: number): Promise<Room | null> => {
  try {
    const room = await roomRepository.findOne({
      where: { idRoom: id },
      relations: ["users"],
    });
    return room;
  } catch (error) {
    throw new Error(
      `Could not fetch room with id "${id}". Please try again later.`
    );
  }
};

const createRoom = async (roomData: Partial<Room>): Promise<Room> => {
  try {
    const newRoom = roomRepository.create(roomData); // Cria a instância de Room
    return newRoom;
  } catch (error) {
    throw new Error("An error occurred while creating the room.");
  }
};

const save = async (room: Room): Promise<Room> => {
  try {
    return await roomRepository.save(room); // Salva no banco de dados
  } catch (error) {
    throw new Error("An error occurred while saving the room.");
  }
};

const findAllWithFilters = async (
  filters: {
    subjectId?: number;
    contentId?: number;
    startDate?: Date;
    endDate?: Date;
  } = {},
  orderBy: "totalLike" | "dataCreation" = "totalLike"
): Promise<Room[]> => {
  try {
    const query = roomRepository
      .createQueryBuilder("room")
      .leftJoinAndSelect("room.contents", "content");

    if (filters.subjectId) {
      query.andWhere("room.subject.idSubject = :subjectId", {
        subjectId: filters.subjectId,
      });
    }

    if (filters.contentId) {
      query.andWhere("content.idContent = :contentId", {
        contentId: filters.contentId,
      });
    }

    if (filters.startDate && filters.endDate) {
      query.andWhere("room.dataCreation BETWEEN :startDate AND :endDate", {
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
    } else if (filters.startDate) {
      query.andWhere("room.dataCreation >= :startDate", {
        startDate: filters.startDate,
      });
    } else if (filters.endDate) {
      query.andWhere("room.dataCreation <= :endDate", {
        endDate: filters.endDate,
      });
    }

    query.orderBy(`room.${orderBy}`, "DESC");

    const rooms = await query.getMany();
    return rooms;
  } catch (error) {
    throw new Error(
      "An error occurred while fetching rooms. Please try again later."
    );
  }
};

const findLastRoomByUser = async (userId: number): Promise<Room | null> => {
  try {
    const lastRoom = await roomRepository.findOne({
      where: { user: { idUser: userId } },
      order: { dataCreation: "DESC" },
      relations: [
        "roomPuzzles",
        "roomPuzzles.puzzle",
        "roomPuzzles.roomArtifacts",
        "roomPuzzles.roomArtifacts.artifact",
      ],
    });
    return lastRoom;
  } catch (error) {
    throw new Error(
      `Could not fetch the last room created by user: ${
        (error as Error).message
      }`
    );
  }
};

const findByUserId = async (userId: number): Promise<Room[]> => {
  try {
    return await roomRepository.find({
      where: { user: { idUser: userId } },
      relations: ["subjects", "user", "contents", "scenario"],
      order: {
        dataCreation: "DESC",
      },
    });
  } catch (error) {
    throw new Error("An error occurred while fetching rooms for the user.");
  }
};

const findRoomById = async (roomId: number): Promise<Room | null> => {
  try {
    const room = await roomRepository.findOne({
      where: { idRoom: roomId },
      relations: [
        "roomPuzzles",
        "roomPuzzles.puzzle",
        "roomPuzzles.roomArtifacts",
        "roomPuzzles.roomArtifacts.artifact",
        "user",
        "scenario",
        "subjects",
        "contents",
      ],
    });
    return room;
  } catch (error) {
    throw new Error(
      `Could not fetch the room with ID ${roomId}: ${(error as Error).message}`
    );
  }
};

export default {
  findAll,
  findByCode,
  findById,
  findByIdTbLike,
  createRoom,
  save,
  findAllWithFilters,
  findLastRoomByUser,
  findByUserId,
  findRoomById,
};
