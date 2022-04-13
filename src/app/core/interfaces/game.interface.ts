import { playerInterface } from "./player.interface";

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