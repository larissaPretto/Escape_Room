import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ScenarioPuzzle } from "./ScenarioPuzzle";

@Entity()
export class Scenario {
  @PrimaryGeneratedColumn("increment", { name: "idScenario", type: "int" })
  idScenario!: number;

  @Column({ name: "name", type: "varchar", length: 50, unique: true })
  name!: string;

  @Column({ name: "description", type: "text" })
  description!: string;

  @Column({ name: "img", type: "varchar", length: 50 })
  img!: string;

  @Column({ name: "level", type: "varchar", length: 50 })
  level!: string;

  @OneToMany(() => ScenarioPuzzle, (scenarioPuzzle) => scenarioPuzzle.scenario)
  scenarioPuzzles!: ScenarioPuzzle[];
}
