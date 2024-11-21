import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Room } from "./Room";

@Entity()
export class Content {
  @PrimaryGeneratedColumn("increment", { name: "idContent", type: "int" })
  idContent!: number;

  @Column({ name: "name", type: "varchar", length: 40 })
  name!: string;

  @ManyToMany(() => Room, (room) => room.contents)
  rooms!: Room[];
}
