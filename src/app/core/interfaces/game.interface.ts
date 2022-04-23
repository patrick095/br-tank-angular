import { playerInterface, positionInterface } from './player.interface';

export interface GameStartInterface {
  players: Array<playerInterface>;
  wind: GameWindInterface;
  isMyTurn: boolean;
  turn: number;
}

export interface gameInterface {
  _id: string;
  wind: GameWindInterface;
  players: Array<string>;
  playerTurn: string;
  turn: number;
  winner: playerInterface;
  countdown: number;
  status: 'playning' | 'finished';
}

export interface getGameInterface {
  game?: gameInterface;
  players?: Array<playerInterface>;
}

export interface GameWindInterface {
  angle: number;
  speed: number;
}

export interface GunShootInterface {
  playerPosition: positionInterface;
  enemyPosition: positionInterface;
  playerId: string;
  enemyId: string;
  angle: number;
  power: number;
}

export interface shootInterface {
  playerId: string;
  gameId: string;
  power: number;
  angle: number
}

export interface roomInterface {
  id: number;
  players: Array<playerRoomInterface>;
  map?: string;
  status: 'waiting' | 'playing' | 'finished';
}

interface playerRoomInterface {
  id: string;
  username: string;
}