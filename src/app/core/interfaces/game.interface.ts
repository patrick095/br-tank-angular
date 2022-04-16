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
  enemyPosition: positionInterface;
  angle: number;
  power: number;
  id: string;
  enemyId: string;
}

export interface shootInterface {
  id: string;
  angle: number;
  power: number;
}

export interface roomInterface {
  id: number;
  players: Array<string>;
  map?: string;
  status: 'waiting' | 'playing' | 'finished';
}