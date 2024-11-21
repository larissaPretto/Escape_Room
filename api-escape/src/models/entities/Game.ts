import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Room } from "./Room";
import { Player } from "./Player";

@Entity()
export class Game {
  @PrimaryGeneratedColumn("increment", { name: "idGame", type: "int" })
  idGame!: number;

  @Column({ name: "win", type: "boolean", default: false })
  win!: boolean;

  @Column({ name: "timeEnd", type: "time", default: "00:00:00" })
  timeEnd!: string;

  @Column({ name: "dataGame", type: "timestamp" })
  dataGame!: Date;

  @ManyToOne(() => Room) // { eager: true }
  @JoinColumn({ name: "idRoom", referencedColumnName: "idRoom" })
  room!: Room;

  @ManyToOne(() => Player, (player) => player.games, { cascade: true })
  @JoinColumn({ name: "idPlayer", referencedColumnName: "idPlayer" })
  player!: Player; // Relacionado ao jogador que fez a jogada
}
