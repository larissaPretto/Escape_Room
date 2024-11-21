import dataSource from "../../config/orm";
import { RoomArtifact } from "../entities/RoomArtifact";

const roomArtifactRepository = dataSource.getRepository(RoomArtifact);

const createRoomArtifact = async (
  roomArtifactData: Partial<RoomArtifact>
): Promise<RoomArtifact> => {
  try {
    const newRoomArtifact = roomArtifactRepository.create(roomArtifactData); // Cria a entidade
    return newRoomArtifact;
  } catch (error) {
    throw new Error("An error occurred while creating the RoomArtifact.");
  }
};

const save = async (roomArtifact: RoomArtifact): Promise<RoomArtifact> => {
  try {
    return await roomArtifactRepository.save(roomArtifact); // Salva no banco
  } catch (error) {
    throw new Error("An error occurred while saving the RoomArtifact.");
  }
};

const findOne = async (id: number): Promise<RoomArtifact | null> => {
  try {
    return await roomArtifactRepository.findOne({
      where: { idRoomArtifact: id },
    });
  } catch (error) {
    throw new Error("An error occurred while finding the RoomArtifact.");
  }
};

const findByRoomPuzzleId = async (
  roomPuzzleId: number
): Promise<RoomArtifact[]> => {
  return await roomArtifactRepository.find({
    where: { roomPuzzle: { idRoomPuzzle: roomPuzzleId } },
  });
};

export default {
  createRoomArtifact,
  save,
  findOne,
  findByRoomPuzzleId,
};
