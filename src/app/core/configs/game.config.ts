import { positionInterface } from "../interfaces/player.interface";

export class GameConfig {
    private countDown: number;
    private maxPower: number;
    private maxPlayers: number;
    private maxWindSpeed: number;
    private initialPositions: Array<positionInterface>;

    constructor() {
        this.countDown = 15;
        this.maxPower = 100;
        this.maxPlayers = 2;
        this.maxWindSpeed = 5;
        this.initialPositions = [{x:90, y: 0}, {x: 670, y: 0}];
    }

    public get CountDown(): number {
        return this.countDown;
    }

    public get MaxPower(): number {
        return this.maxPower;
    }

    public get MaxPlayers(): number {
        return this.maxPlayers;
    }

    public get MaxWindSpeed(): number {
        return this.maxWindSpeed;
    }

    public get InitialPositions(): Array<positionInterface> {
        return this.initialPositions;
    }
}