export interface userInterface {
    _id: string;
    username: string;
    name: string;
    password: string;
    email: string;
    playerId?: string;
}

export interface signUpInterface {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface signinInterface {
    username: string;
    password: string;
}

