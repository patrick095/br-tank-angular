import * as uuid from "uuid";
import { GameConfig } from "../configs/game.config";
import { positionInterface } from "../interfaces/player.interface";

export class Player {
    private _id: string;
    private _name: string;
    private _position: positionInterface;
    private _team: number;
    private _color: string;
    private _hp: number;

    constructor(name: string, team: number, color: string) {
        const config = new GameConfig()
        this._id = uuid.v4();
        this._name = name;
        this._position = { x: config.InitialPositions[team].x, y: config.InitialPositions[team].y };
        this._team = team;
        this._color = color;
        this._hp = 100;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get position(): positionInterface {
        return this._position;
    }

    public set position(position: positionInterface) {
        this._position = position;
    }

    public get team(): number {
        return this._team;
    }

    public get color(): string {
        return this._color;
    }

    public get hp(): number {
        return this._hp;
    }

    public set hp(hp: number) {
        this._hp = hp;
    }
}