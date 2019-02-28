import { Role } from "./role";

export class UserDB {
    username: string;
    firstName: string;
    lastName: string;
    role: Role;
    lat: string;
    lng: string;
    label: string;
}

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
}