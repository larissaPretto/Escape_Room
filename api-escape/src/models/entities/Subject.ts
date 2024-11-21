import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Room } from "./Room";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn("increment", { name: "idSubject", type: "int" })
  idSubject!: number;

  @Column({ name: "name", type: "varchar", length: 40 })
  name!: string;

  @ManyToMany(() => Room, (room) => room.subjects)
  rooms!: Room[];
}
