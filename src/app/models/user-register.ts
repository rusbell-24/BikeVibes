import { Suscripcion } from "../components/pages/auth/enums/suscripcion";

export interface UserRegister {
    username: string;
    email: string;
    password: string;
    suscripcion:Suscripcion;
}
