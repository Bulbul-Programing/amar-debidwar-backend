import { JwtPayload } from "jsonwebtoken";

export enum UserRole {
    MP = "MP",
    ADMIN = "ADMIN",
    USER = "USER"
}

export type TUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    createdAt: Date;
    updateAt: Date;
};

export type TUpdateUser = {
    name?: string;
    phoneNumber?: string;
    profilePhoto?: string | null;
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
};

export type TDecodedUser = JwtPayload