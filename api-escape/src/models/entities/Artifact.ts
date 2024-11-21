import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PuzzleArtifact } from "./PuzzleArtifact";
import { RoomArtifact } from "./RoomArtifact";

@Entity()
export class Artifact {
  @PrimaryGeneratedColumn("increment", { name: "idArtifact", type: "int" })
  idArtifact!: number;

  @Column({ name: "name", type: "varchar", length: 40 })
  name!: string;

  @Column({ name: "img", type: "varchar" })
  img!: string;

  @OneToMany(
    () => PuzzleArtifact,
    (puzzleArtifact) => puzzleArtifact.artifact,
    {
      cascade: true,
      eager: true,
    }
  )
  puzzleArtifacts!: PuzzleArtifact[];

  @OneToMany(() => RoomArtifact, (roomArtifact) => roomArtifact.artifact)
  roomArtifacts!: RoomArtifact[]; // Adiciona a relação de Artifact com RoomArtifact
}
