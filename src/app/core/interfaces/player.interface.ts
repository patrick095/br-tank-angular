export interface playerInterface {
    id: string;
    name: string;
    position: positionInterface;
    team: number;
    color: string;
    hp: number;
}

export interface positionInterface {
    x: number;
    y: number;
}