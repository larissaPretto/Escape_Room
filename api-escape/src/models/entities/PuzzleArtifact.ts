import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Puzzle } from "./Puzzle";
import { Artifact } from "./Artifact";

@Entity()
export class PuzzleArtifact {
  @PrimaryGeneratedColumn("increment", {
    name: "idPuzzleArtifact",
    type: "int",
  })
  idPuzzleArtifact!: number;

  @ManyToOne(() => Puzzle, (puzzle) => puzzle.puzzleArtifacts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "puzzleId", referencedColumnName: "idPuzzle" })
  puzzle!: Puzzle;

  @ManyToOne(() => Artifact, (artifact) => artifact.puzzleArtifacts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "artifactId", referencedColumnName: "idArtifact" })
  artifact!: Artifact;
}
