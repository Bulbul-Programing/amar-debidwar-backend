import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../modules/User/user.interface";
import AppError from "../error/AppError";
import { verifyToken } from "../utils/jwtToken";
import { envVars } from "../envConfig";
import { prisma } from "../DBconfig/db";

export type decodedPayload = {
    userId: string,
    email: string,
    role: UserRole
}

export const validateUser = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.cookies.accessToken || req.headers.authorization;
        
        if (!accessToken) {
            throw new AppError(403, "Token Not found")
        }

        const verifiedToken = verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRETE) as JwtPayload

        const isUserExist = await prisma.user.findUnique({ where: { email: verifiedToken.email } })

        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
        }
        if (!isUserExist.isActive) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is Blocked")
        }
        if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "User Not found")
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not authorized for this route!!!")
        }
        req.user = verifiedToken
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}