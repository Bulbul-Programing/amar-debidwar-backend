import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { TComplain } from "./complain.interface";

const createComplain = async (data: TComplain) => {
    return await prisma.complain.create({
        data,
        include: {
            category: true,
        },
    });
};

const getAllComplains = async () => {
    return await prisma.complain.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

const getSingleComplain = async (id: string) => {
    const complain = await prisma.complain.findUnique({
        where: { id },
        include: {
            category: true,
        },
    });

    if (!complain) {
        throw new AppError(404, "Complain not found!");
    }

    return complain;
};

const updateComplain = async (id: string, data: Partial<TComplain>) => {
    const isExist = await prisma.complain.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new AppError(404, "Complain not found!");
    }

    if (data.complainCategory) {
        const isCategoryExist = await prisma.complaintCategory.findUnique({
            where: { id: data.complainCategory },
        });

        if (!isCategoryExist) {
            throw new AppError(404, "Complaint category not found!");
        }
    }

    return await prisma.complain.update({
        where: { id },
        data,
        include: {
            category: true,
        },
    });
};

const deleteComplain = async (id: string) => {
    const isExist = await prisma.complain.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new AppError(404, "Complain not found!");
    }

    await prisma.complain.delete({
        where: { id },
    });

    return null;
};

export const complainService = {
    createComplain,
    getAllComplains,
    getSingleComplain,
    updateComplain,
    deleteComplain,
};
