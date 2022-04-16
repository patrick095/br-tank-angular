export interface playerInterface {
    _id: string;
    name: string;
    position: positionInterface;
    team: number;
    color: string;
    hp: number;
    angle: number;
}

export interface positionInterface {
    x: number;
    y: number;
}