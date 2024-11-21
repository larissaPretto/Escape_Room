import RoomRepository from "../models/repositories/RoomRepository";
import { Room } from "../models/entities/Room";
import generateRandomCode from "../utils/generateRandomCode";
import SubjectRepository from "../models/repositories/SubjectRepository";
import UserRepository from "../models/repositories/UserRepository";
import ContentRepository from "../models/repositories/ContentRepository";
import { Content } from "../models/entities/Content";
import PuzzleRepository from "../models/repositories/PuzzleRepository";
import { RoomPuzzle } from "../models/entities/RoomPuzzle";
import RoomPuzzleRepository from "../models/repositories/RoomPuzzleRepository";
import { Puzzle } from "../models/entities/Puzzle";
import RoomArtifactRepository from "../models/repositories/RoomArtifactRepository";
import ScenarioRepository from "../models/repositories/ScenarioRepository";
import ScenarioPuzzleRepository from "../models/repositories/ScenarioPuzzleRepository";
import ArtifactRepository from "../models/repositories/ArtifactRepository";
import PuzzleArtifactRepository from "../models/repositories/PuzzleArtifactRepository";

const getAllRooms = async (): Promise<Room[]> => {
  try {
    return await RoomRepository.findAll({
      relations: [
        "subjects",
        "user",
        "contents",
        "scenario",
        "roomPuzzles",
        "roomPuzzles.puzzle",
        "roomPuzzles.roomArtifacts", // Relaciona RoomArtifacts a RoomPuzzle
        "roomPuzzles.roomArtifacts.artifact", // Carrega os Artifacts relacionados
      ], // Carrega as relações necessárias
    });
  } catch (error) {
    throw new Error("Failed to fetch rooms.");
  }
};

const getRoomByCode = async (code: string): Promise<Room | null> => {
  try {
    return await RoomRepository.findByCode(code, {
      relations: [
        "subjects", // Atualizado para refletir a nova relação ManyToMany
        "user",
        "contents",
        "roomPuzzles",
        "roomPuzzles.puzzle",
        "roomPuzzles.roomArtifacts", // Relaciona RoomArtifacts a RoomPuzzle
        "roomPuzzles.roomArtifacts.artifact", // Carrega os Artifacts relacionados
        "scenario", // Carrega o cenário
      ],
    });
  } catch (error) {
    throw new Error(
      `Failed to retrieve room with code "${code}". Please try again later.`
    );
  }
};

const createRoom = async (roomData: {
  name: string;
  description: string;
  time: string;
  scenarioId: number;
  userId: number;
  subjectIds: number[];
  contentIds?: number[];
  endgame: string;
  victory: string;
}): Promise<Room> => {
  try {
    const scenario = await ScenarioRepository.findById(roomData.scenarioId);
    if (!scenario) {
      throw new Error("Scenario not found");
    }

    const user = await UserRepository.findById(roomData.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const subjects = await SubjectRepository.findByIds(roomData.subjectIds);
    if (subjects.length !== roomData.subjectIds.length) {
      throw new Error("Some subjects not found");
    }

    let contents: Content[] = [];
    if (roomData.contentIds && roomData.contentIds.length > 0) {
      contents = await ContentRepository.findByIds(roomData.contentIds);
      if (contents.length !== roomData.contentIds.length) {
        throw new Error("Some contents not found");
      }
    }

    const roomCode = generateRandomCode(6);

    const room = RoomRepository.createRoom({
      ...roomData,
      code: roomCode,
      subjects,
      user,
      contents,
      scenario,
    });

    // Salva o room
    const createdRoom = await RoomRepository.save(await room);

    // Pega os puzzles associados ao cenário
    const scenarioPuzzles = await ScenarioPuzzleRepository.findByScenarioId(
      roomData.scenarioId
    );

    // Criar e salvar RoomPuzzle e RoomArtifact para cada puzzle e artifact do cenário
    await Promise.all(
      scenarioPuzzles.map(async (scenarioPuzzle) => {
        // Criar RoomPuzzle
        const roomPuzzle = RoomPuzzleRepository.createRoomPuzzle({
          room: createdRoom,
          puzzle: scenarioPuzzle.puzzle,
          answer: "", // Inicializar vazio
        });
        const createdRoomPuzzle = await RoomPuzzleRepository.save(
          await roomPuzzle
        );

        // Pegar os artifacts desse puzzle e criar RoomArtifact
        const puzzleArtifacts = await PuzzleArtifactRepository.findByPuzzleId(
          scenarioPuzzle.puzzle.idPuzzle
        );
        await Promise.all(
          puzzleArtifacts.map(async (puzzleArtifact) => {
            const roomArtifact = RoomArtifactRepository.createRoomArtifact({
              roomPuzzle: createdRoomPuzzle, // Relaciona diretamente com RoomPuzzle
              artifact: puzzleArtifact.artifact,
              value: "", // Inicializar vazio
            });
            await RoomArtifactRepository.save(await roomArtifact);
          })
        );
      })
    );

    return createdRoom;
  } catch (error) {
    throw new Error(`Failed to create room: ${(error as Error).message}`);
  }
};

// const likeRoom = async (idUser: number, idRoom: number): Promise<Room> => {
//   try {
//     const user = await UserRepository.findById(idUser);
//     if (!user) {
//       throw new Error("User not found");
//     }

//     const room = await RoomRepository.findByIdTbLike(idRoom);
//     if (!room) {
//       throw new Error("Room not found");
//     }
//     room.users = room.users || [];

//     const userIndex = room.users.findIndex((user) => user.idUser === idUser);

//     if (userIndex >= 0) {
//       room.users.splice(userIndex, 1);
//       room.totalLike = Math.max(0, room.totalLike - 1);
//     } else {
//       room.users.push(user);
//       room.totalLike += 1;
//     }

//     const updatedRoom = await RoomRepository.save(room);

//     return updatedRoom;
//   } catch (error) {
//     throw new Error(`Failed to like/unlike room: ${(error as Error).message}`);
//   }
// };

const getAllRoomsWithFilters = async (
  filters: {
    subjectId?: number;
    contentId?: number;
    startDate?: Date;
    endDate?: Date;
  } = {},
  orderBy: "totalLike" | "dataCreation" = "totalLike"
): Promise<Room[]> => {
  try {
    return await RoomRepository.findAllWithFilters(filters, orderBy);
  } catch (error) {
    throw new Error("Failed to retrieve rooms. Please try again later.");
  }
};

const getLastRoomByUser = async (userId: number): Promise<Room | null> => {
  return await RoomRepository.findLastRoomByUser(userId);
};

const getRoomsByUserId = async (userId: number): Promise<Room[]> => {
  try {
    return await RoomRepository.findByUserId(userId);
  } catch (error) {
    throw new Error(
      `Failed to retrieve rooms for user ID ${userId}: ${
        (error as Error).message
      }`
    );
  }
};

const getRoomById = async (roomId: number): Promise<Room | null> => {
  return await RoomRepository.findRoomById(roomId);
};

const updatePuzzle = async (
  idRoomPuzzle: number,
  answer: string,
  artifacts: any[]
): Promise<void> => {
  try {
    const puzzle = await RoomPuzzleRepository.findOne(idRoomPuzzle);
    if (!puzzle) throw new Error(`Puzzle with ID ${idRoomPuzzle} not found.`);

    // Atualiza a resposta do puzzle
    puzzle.answer = answer;
    await RoomPuzzleRepository.save(puzzle);

    // Atualiza os artifacts
    for (const artifact of artifacts) {
      const roomArtifact = await RoomArtifactRepository.findOne(
        artifact.idRoomArtifact
      );
      if (roomArtifact) {
        roomArtifact.value = artifact.value;
        await RoomArtifactRepository.save(roomArtifact);
      }
    }
  } catch (error) {
    throw new Error(`Failed to update puzzle: ${(error as Error).message}`);
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
  updatePuzzle,
};
