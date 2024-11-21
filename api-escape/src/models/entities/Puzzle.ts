import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RoomPuzzle } from "./RoomPuzzle";
import { PuzzleArtifact } from "./PuzzleArtifact";
import { ScenarioPuzzle } from "./ScenarioPuzzle";

@Entity()
export class Puzzle {
  @PrimaryGeneratedColumn("increment", { name: "idPuzzle", type: "int" })
  idPuzzle!: number;

  @Column({ name: "name", type: "varchar", length: 50 })
  name!: string;

  @Column({ name: "description", type: "text" })
  description!: string;

  @Column({ name: "img", type: "varchar" })
  img!: string;

  @OneToMany(() => RoomPuzzle, (roomPuzzle) => roomPuzzle.puzzle)
  roomPuzzles!: RoomPuzzle[];

  @OneToMany(() => PuzzleArtifact, (puzzleArtifact) => puzzleArtifact.puzzle, {
    cascade: true,
    eager: true,
  })
  puzzleArtifacts!: PuzzleArtifact[];

  @OneToMany(() => ScenarioPuzzle, (scenarioPuzzle) => scenarioPuzzle.puzzle)
  scenarioPuzzles!: ScenarioPuzzle[];
}
