import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Room } from "./Room";
import { Puzzle } from "./Puzzle";
import { RoomArtifact } from "./RoomArtifact";

@Entity()
export class RoomPuzzle {
  @PrimaryGeneratedColumn("increment", { name: "idRoomPuzzle", type: "int" })
  idRoomPuzzle!: number;

  @Column({ name: "answer", type: "text" })
  answer!: string;

  @ManyToOne(() => Room, (room) => room.roomPuzzles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "roomId", referencedColumnName: "idRoom" })
  room!: Room;

  @ManyToOne(() => Puzzle, (puzzle) => puzzle.roomPuzzles, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "puzzleId", referencedColumnName: "idPuzzle" })
  puzzle!: Puzzle;

  @OneToMany(() => RoomArtifact, (roomArtifact) => roomArtifact.roomPuzzle)
  roomArtifacts!: RoomArtifact[];
}
