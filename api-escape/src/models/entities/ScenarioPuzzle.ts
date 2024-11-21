import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Puzzle } from "./Puzzle";
import { Scenario } from "./Scenario";

@Entity()
export class ScenarioPuzzle {
  @PrimaryGeneratedColumn("increment", {
    name: "idScenarioPuzzle",
    type: "int",
  })
  idScenarioPuzzle!: number;

  @ManyToOne(() => Scenario, (scenario) => scenario.scenarioPuzzles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "scenarioId", referencedColumnName: "idScenario" })
  scenario!: Scenario;

  @ManyToOne(() => Puzzle, (puzzle) => puzzle.scenarioPuzzles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "puzzleId", referencedColumnName: "idPuzzle" })
  puzzle!: Puzzle;
}
