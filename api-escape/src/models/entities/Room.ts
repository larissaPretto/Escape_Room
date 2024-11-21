import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Subject } from "./Subject";
import { User } from "./User";
import { Content } from "./Content";
import { RoomPuzzle } from "./RoomPuzzle";
import { Scenario } from "./Scenario";

@Entity()
export class Room {
  @PrimaryGeneratedColumn("increment", { name: "idRoom", type: "int" })
  idRoom!: number;

  @Column({ name: "name", type: "varchar", length: 50 })
  name!: string;

  @Column({ name: "description", type: "text" })
  description!: string;

  @Column({ name: "endgame", type: "text" })
  endgame!: string;

  @Column({ name: "victory", type: "text" })
  victory!: string;

  @Column({ name: "code", type: "varchar", length: 20, unique: true })
  code!: string;

  @Column({ name: "time", type: "time" })
  time!: string;

  @Column({
    name: "dataCreation",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  dataCreation!: Date;

  @Column({ name: "visibility", type: "boolean", default: true })
  visibility!: boolean;

  @Column({ name: "active", type: "boolean", default: true })
  active!: boolean;

  @Column({ name: "totalLike", type: "integer", default: 0 })
  totalLike!: number;

  @ManyToMany(() => Subject, (subject) => subject.rooms, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: "room_subject" })
  subjects!: Subject[];

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "idUser", referencedColumnName: "idUser" })
  user!: User;

  @Column({ name: "scenarioId", type: "integer" })
  scenarioId!: number;

  @ManyToMany(() => Content, (content) => content.rooms, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: "room_content" })
  contents!: Content[];

  @OneToMany(() => RoomPuzzle, (roomPuzzle) => roomPuzzle.room)
  roomPuzzles!: RoomPuzzle[];

  @ManyToOne(() => Scenario, { eager: true })
  @JoinColumn({ name: "scenarioId", referencedColumnName: "idScenario" })
  scenario!: Scenario;
}
