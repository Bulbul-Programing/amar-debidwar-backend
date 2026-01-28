
import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { TVillage } from "./village.interface";

const createVillage = async (data: TVillage) => {
    const isExistVillage = await prisma.village.findUnique({
        where: { name: data.name },
    });

    if (isExistVillage) {
        throw new AppError(400, "Village with this name already exists!");
    }

    return await prisma.village.create({
        data,
    });
};

const getAllVillages = async () => {
    return await prisma.village.findMany({
        orderBy: {
            name: "asc",
        },
    });
};

const getSingleVillage = async (id: string) => {
    const isExistVillage = await prisma.village.findUnique({
        where: { id },
    });

    if (!isExistVillage) {
        throw new AppError(404, "Village not found!");
    }

    return isExistVillage;
};

const updateVillage = async (
    id: string,
    data: Partial<TVillage>
) => {
    const isExistVillage = await prisma.village.findUnique({
        where: { id },
    });

    if (!isExistVillage) {
        throw new AppError(404, "Village not found!");
    }

    const updatedVillage = await prisma.village.update({
        where: { id },
        data,
    });

    return updatedVillage;
};

const deleteVillage = async (id: string) => {
    const isExistVillage = await prisma.village.findUnique({
        where: { id },
    });

    if (!isExistVillage) {
        throw new AppError(404, "Village not found!");
    }

    await prisma.village.delete({
        where: { id },
    });

    return null;
};

export const fundSourceService = {
    createVillage,
    getAllVillages,
    getSingleVillage,
    updateVillage,
    deleteVillage
}