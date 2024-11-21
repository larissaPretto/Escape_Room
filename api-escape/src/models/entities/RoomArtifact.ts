import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { RoomPuzzle } from "./RoomPuzzle";
import { Artifact } from "./Artifact";

@Entity()
export class RoomArtifact {
  @PrimaryGeneratedColumn("increment", { name: "idRoomArtifact", type: "int" })
  idRoomArtifact!: number;

  @ManyToOne(() => RoomPuzzle, (roomPuzzle) => roomPuzzle.roomArtifacts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "roomPuzzleId", referencedColumnName: "idRoomPuzzle" })
  roomPuzzle!: RoomPuzzle;

  @ManyToOne(() => Artifact, (artifact) => artifact.roomArtifacts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "artifactId", referencedColumnName: "idArtifact" })
  artifact!: Artifact;

  @Column({ name: "value", type: "text", nullable: true })
  value!: string;
}
