import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Room } from "./Room";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment", { name: "idUser", type: "int" })
  idUser!: number;

  @Column({ name: "username", type: "varchar", length: 50 })
  username!: string;

  @Column({ name: "email", type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ name: "password", type: "varchar", length: 255 })
  password!: string;

  @Column({ name: "creator", type: "boolean" })
  creator!: boolean;

  @ManyToMany(() => Room, (room) => room.user, { cascade: true })
  @JoinTable({ name: "user_room" })
  rooms!: Room[];
}
