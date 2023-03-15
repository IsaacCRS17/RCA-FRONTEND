import { IUser } from "./user";

export interface IImage {
    code: string;
    name: string;
    route: string;
    usuarioDTO:IUser
}