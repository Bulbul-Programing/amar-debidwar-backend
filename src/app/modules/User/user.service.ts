import { prisma } from "../../DBconfig/db";
import { envVars } from "../../envConfig";
import AppError from "../../error/AppError";
import { generateSlug } from "../../utils/generateSlug";
import bcrypt from 'bcryptjs';
import { TUpdateUser, TUser, UserRole } from "./user.interface";
import { paginateCalculation } from "../../utils/paginateCalculation";
import QueryBuilder from "../../builder/QueryBuilder";

const createUser = async (payload: TUser) => {
    const isExistUser = await prisma.user.findUnique({
        where: { email: payload.email }
    })

    if (isExistUser) {
        throw new AppError(400, 'User already exist!')
    }

    const hashPassword = await bcrypt.hash(payload.password, Number(envVars.BCRYPT_ROUNDS))
    payload.password = hashPassword

    const createUser = await prisma.user.create(
        {
            data: payload
        }
    )

    return createUser
}

const crateAdmin = async (payload: TUser) => {
    const isExistUser = await prisma.user.findUnique({
        where: { email: payload.email }
    })

    if (isExistUser) {
        throw new AppError(400, 'User already exist!')
    }

    const hashPassword = await bcrypt.hash(payload.password, Number(envVars.BCRYPT_ROUNDS))
    payload.password = hashPassword
    payload.role = UserRole.ADMIN

    const createUser = await prisma.user.create(
        {
            data: payload
        }
    )

    return createUser
}

const getAllUsers = async (options: any) => {
    const { page, limit, skip } = paginateCalculation(options)

    const usersQueryBuilder = new QueryBuilder(options)
        .searching(["name", "email", "phone"])
        .sort()
        .fields()
        .paginate()

    const result = await prisma.user.findMany({
        ...usersQueryBuilder.prismaQuery
    })

    const total = await prisma.user.count({
        where: usersQueryBuilder.prismaQuery.where
    })

    const returnData = {
        meta: {
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil(total / Number(limit)),
            total: total,
            skip: Number(skip)
        },
        data: result
    }

    return returnData
}

const getSingleUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId, isActive: true },
        omit: {
            password: true
        }
    })

    if (!user) {
        throw new AppError(404, "User not found")
    }

    return user
}

const updateUser = async (
    userId: string,
    payload: TUpdateUser
) => {
    const user = await prisma.user.findUnique({
        where: { id: userId, isActive: true }
    });

    if (!user) {
        throw new AppError(404, "User not found");
    }

    let hashedPassword: string | undefined;

    if (payload.oldPassword || payload.newPassword || payload.confirmPassword) {

        if (!payload.oldPassword || !payload.newPassword || !payload.confirmPassword) {
            throw new AppError(400, "Old, new and confirm password are required");
        }

        const isMatch = await bcrypt.compare(
            payload.oldPassword,
            user.password
        );

        if (!isMatch) {
            throw new AppError(400, "Current password is incorrect");
        }

        if (payload.newPassword !== payload.confirmPassword) {
            throw new AppError(400, "Nwe  passwords do not match");
        }

        payload.password = await bcrypt.hash(
            payload.newPassword,
            Number(envVars.BCRYPT_ROUNDS)
        );

        delete payload.newPassword
        delete payload.oldPassword
        delete payload.confirmPassword
    }

    const updateUser = await prisma.user.update({
        where: { id: userId },
        data: payload
    })

    return updateUser
};

const deleteUser = async (userId: string) => {
    const isExistUser = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!isExistUser) {
        throw new AppError(404, "User not found");
    }

    const softDeleteUser = await prisma.user.update({
        where: { id: userId },
        data: {
            isDeleted: true
        }
    })
    return null
}

const blockedUser = async (userId: string) => {
    const isExistUser = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!isExistUser) {
        throw new AppError(404, "User not found");
    }

    const blockedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            isActive: false
        }
    })
    return blockedUser
}


export const userService = {
    createUser,
    crateAdmin,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    blockedUser
}