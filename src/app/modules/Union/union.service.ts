import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { TUnion } from "./union.interface";

const createUnion = async (data: TUnion) => {
    const isExistUnion = await prisma.union.findUnique({
        where: { name: data.name }
    })

    if (isExistUnion) {
        throw new AppError(400, "Union with this name already exists!")
    }

    return await prisma.union.create({
        data,
    });
};

const getAllUnions = async () => {
    return await prisma.union.findMany({
        orderBy: {
            name: "asc",
        },
    });
};

const getSingleUnion = async (id: string) => {
    const isExistUnion = await prisma.union.findUnique({
        where: { id },
    });

    if (!isExistUnion) {
        throw new AppError(404, "Union not found!")
    }

    return isExistUnion
};

const updateUnion = async (
    id: string,
    data: Partial<TUnion>
) => {
    const isExistUnion = await prisma.union.findUnique({
        where: { id },
    });

    if (!isExistUnion) {
        throw new AppError(404, "Union not found!")
    }
    const updateUnion = await prisma.union.update({
        where: { id },
        data,
    });
    return updateUnion
};

const deleteUnion = async (id: string) => {
    const isExistUnion = await prisma.union.findUnique({
        where: { id },
    });

    if (!isExistUnion) {
        throw new AppError(404, "Union not found!")
    }

    const deleteUnion = await prisma.union.delete({
        where: { id }
    })
    return null
}

export const fundSourceService = {
    createUnion,
    getAllUnions,
    getSingleUnion,
    updateUnion,
    deleteUnion
}