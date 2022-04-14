import { playerInterface, positionInterface } from './player.interface';

export interface GameStartInterface {
  players: Array<playerInterface>;
  wind: GameWindInterface;
  isMyTurn: boolean;
  turn: number;
}

export interface GameWindInterface {
  angle: number;
  speed: number;
}

export interface GunShootInterface {
  playerPosition: positionInterface;
  angle: number;
  power: number;
}

export interface shootInterface {
  id: string;
  angle: number;
  power: number;
}
