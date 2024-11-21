import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Game } from "./Game";

@Entity()
export class Player {
  map(arg0: (player: any) => { idPlayer: any; username: any }) {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("increment", { name: "idPlayer", type: "int" })
  idPlayer!: number;

  @Column({ name: "username", type: "varchar", length: 50 })
  username!: string;

  @OneToMany(() => Game, (game) => game.player)
  games!: Game[];
}
