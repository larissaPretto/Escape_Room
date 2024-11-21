import dataSource from "../../config/orm";
import { RoomPuzzle } from "../entities/RoomPuzzle";

const roomPuzzleRepository = dataSource.getRepository(RoomPuzzle);

const findOne = async (idRoomPuzzle: number): Promise<RoomPuzzle | null> => {
  try {
    return await roomPuzzleRepository.findOne({
      where: { idRoomPuzzle },
      relations: ["roomArtifacts"], // Inclui as relações necessárias
    });
  } catch (error) {
    throw new Error(`An error occurred while finding the RoomPuzzle: ${error}`);
  }
};

const createRoomPuzzle = async (
  roomPuzzleData: Partial<RoomPuzzle>
): Promise<RoomPuzzle> => {
  try {
    const newRoomPuzzle = roomPuzzleRepository.create(roomPuzzleData); // Cria a entidade
    return newRoomPuzzle;
  } catch (error) {
    throw new Error("An error occurred while creating the RoomPuzzle.");
  }
};

const save = async (roomPuzzle: RoomPuzzle): Promise<RoomPuzzle> => {
  try {
    return await roomPuzzleRepository.save(roomPuzzle); // Salva no banco
  } catch (error) {
    throw new Error("An error occurred while saving the RoomPuzzle.");
  }
};

export default {
  findOne,
  createRoomPuzzle,
  save,
};
