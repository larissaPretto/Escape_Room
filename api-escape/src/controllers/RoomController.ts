import { Request, Response } from "express";
import RoomService from "../services/RoomService";

const getAllRooms = async (req: Request, res: Response): Promise<Response> => {
  try {
    const rooms = await RoomService.getAllRooms();

    if (rooms && rooms.length > 0) {
      const response = rooms.map((room) => ({
        idRoom: room.idRoom,
        name: room.name,
        description: room.description,
        endgame: room.endgame,
        victory: room.victory,
        code: room.code,
        time: room.time,
        dataCreation: room.dataCreation,
        visibility: room.visibility,
        active: room.active,
        totalLike: room.totalLike,
        scenario: {
          idScenario: room.scenario.idScenario,
          name: room.scenario.name,
          description: room.scenario.description,
        },
        subjects: room.subjects.map((subject) => ({
          idSubject: subject.idSubject,
          name: subject.name,
        })),
        username: room.user.username,
        contents: room.contents.map((content) => ({
          idContent: content.idContent,
          name: content.name,
        })),
      }));

      return res.status(200).json({ rooms: response });
    } else {
      return res.status(404).json({ message: "No rooms found." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch rooms." });
  }
};

const getRoomByCode = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const code = req.params.code;
    const room = await RoomService.getRoomByCode(code);

    if (room) {
      const response = {
        idRoom: room.idRoom,
        name: room.name,
        description: room.description,
        endgame: room.endgame,
        victory: room.victory,
        code: room.code,
        time: room.time,
        dataCreation: room.dataCreation,
        visibility: room.visibility,
        active: room.active,
        totalLike: room.totalLike,
        scenario: {
          idScenario: room.scenario.idScenario,
          name: room.scenario.name,
          description: room.scenario.description,
          level: room.scenario.level,
          img: room.scenario.img,
        },
        subjects: room.subjects.map((subject) => ({
          idSubject: subject.idSubject,
          name: subject.name,
        })),
        username: room.user.username,
        contents: room.contents.map((content) => ({
          idContent: content.idContent,
          name: content.name,
        })),
        puzzles: room.roomPuzzles.map((roomPuzzle) => ({
          idRoomPuzzle: roomPuzzle.idRoomPuzzle,
          name: roomPuzzle.puzzle.name,
          description: roomPuzzle.puzzle.description,
          answer: roomPuzzle.answer,
          img: roomPuzzle.puzzle.img,
          artifacts: roomPuzzle.roomArtifacts.map((roomArtifact) => ({
            idRoomArtifact: roomArtifact.idRoomArtifact,
            name: roomArtifact.artifact.name,
            value: roomArtifact.value,
            img: roomArtifact.artifact.img,
          })),
        })),
      };
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: `Room not found.` });
    }
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred." });
  }
};

const createRoom = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      name,
      description,
      time,
      scenarioId,
      subjectIds, // Atualizado para permitir múltiplos IDs de subject
      userId,
      contentIds,
      endgame,
      victory,
    } = req.body;
    console.log(req.body);
    // Validação do Scenario ID
    if (!scenarioId) {
      return res.status(400).json({ message: "Scenario ID is required." });
    }

    // Passar os dados para o Service
    const roomData = {
      name,
      description,
      time,
      scenarioId,
      subjectIds, // Passar o array de IDs
      userId,
      contentIds,
      endgame,
      victory,
    };

    console.log(roomData);
    const room = await RoomService.createRoom(roomData);
    return res.status(201).json(room);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

// const likeRoom = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const { idUser, idRoom } = req.body;
//     const updatedRoom = await RoomService.likeRoom(idUser, idRoom);
//     return res.status(200).json(updatedRoom);
//   } catch (error) {
//     return res.status(500).json({ error: (error as Error).message });
//   }
// };

const getAllRoomsWithFilters = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { subjectId, contentId, startDate, endDate, orderBy } = req.query;

    const filters: {
      subjectId?: number;
      contentId?: number;
      startDate?: Date;
      endDate?: Date;
    } = {};

    if (subjectId) {
      filters.subjectId = parseInt(subjectId as string, 10);
    }

    if (contentId) {
      filters.contentId = parseInt(contentId as string, 10);
    }

    if (startDate) {
      filters.startDate = new Date(startDate as string);
    }

    if (endDate) {
      filters.endDate = new Date(endDate as string);
    }

    const rooms = await RoomService.getAllRoomsWithFilters(
      filters,
      orderBy as "totalLike" | "dataCreation"
    );

    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred." });
  }
};

const getLastRoomByUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const lastRoom = await RoomService.getLastRoomByUser(userId);

    if (lastRoom) {
      return res.status(200).json(lastRoom);
    } else {
      return res.status(404).json({ message: "No room found for this user." });
    }
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

const getRoomsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = parseInt(req.params.userId, 10); // Pega o ID do usuário da URL
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const rooms = await RoomService.getRoomsByUserId(userId);
    if (rooms && rooms.length > 0) {
      const response = rooms.map((room) => ({
        idRoom: room.idRoom,
        name: room.name,
        description: room.description,
        endgame: room.endgame,
        victory: room.victory,
        code: room.code,
        time: room.time,
        dataCreation: room.dataCreation,
        visibility: room.visibility,
        active: room.active,
        totalLike: room.totalLike,
        scenario: {
          idScenario: room.scenario.idScenario,
          name: room.scenario.name,
          description: room.scenario.description,
        },
        subjects: room.subjects.map((subject) => ({
          idSubject: subject.idSubject,
          name: subject.name,
        })),
        username: room.user.username,
        contents: room.contents.map((content) => ({
          idContent: content.idContent,
          name: content.name,
        })),
      }));
      return res.status(200).json({ rooms: response });
    } else {
      return res.status(404).json({ message: "No rooms found for this user." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch rooms for the user." });
  }
};

export const getRoomById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const roomId = parseInt(req.params.roomId, 10);
    if (isNaN(roomId)) {
      return res.status(400).json({ message: "Invalid room ID" });
    }

    const room = await RoomService.getRoomById(roomId);

    if (room) {
      const response = {
        name: room.name,
        description: room.description,
        endgame: room.endgame,
        victory: room.victory,
        code: room.code,
        time: room.time,
        dataCreation: room.dataCreation,
        visibility: room.visibility,
        active: room.active,
        totalLike: room.totalLike,
        scenario: {
          idScenario: room.scenario.idScenario,
          name: room.scenario.name,
          description: room.scenario.description,
        },
        subjects: room.subjects.map((subject) => ({
          idSubject: subject.idSubject,
          name: subject.name,
        })),
        username: room.user.username,
        contents: room.contents.map((content) => ({
          idContent: content.idContent,
          name: content.name,
        })),
        puzzles: room.roomPuzzles.map((roomPuzzle) => ({
          idRoomPuzzle: roomPuzzle.idRoomPuzzle,
          name: roomPuzzle.puzzle.name,
          description: roomPuzzle.puzzle.description,
          answer: roomPuzzle.answer,
          img: roomPuzzle.puzzle.img,
          artifacts: roomPuzzle.roomArtifacts.map((roomArtifact) => ({
            idRoomArtifact: roomArtifact.idRoomArtifact,
            name: roomArtifact.artifact.name,
            value: roomArtifact.value,
            img: roomArtifact.artifact.img,
          })),
        })),
      };
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: `Room not found.` });
    }
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred." });
  }
};

const updatePuzzles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { puzzles } = req.body; // Array de puzzles

  try {
    for (const puzzle of puzzles) {
      await RoomService.updatePuzzle(
        puzzle.idRoomPuzzle,
        puzzle.answer,
        puzzle.artifacts
      );
    }

    return res.status(200).json({ message: "Puzzles updated successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Failed to update puzzles: ${(error as Error).message}` });
  }
};

export default {
  getAllRooms,
  createRoom,
  getRoomByCode,
  //likeRoom,
  getAllRoomsWithFilters,
  getLastRoomByUser,
  getRoomsByUserId,
  getRoomById,
  updatePuzzles,
};
