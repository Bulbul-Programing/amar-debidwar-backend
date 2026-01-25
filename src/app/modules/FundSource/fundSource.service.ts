import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { TFundSource } from "./fundSource.interface";

const createFundSource = async (data: TFundSource) => {
    return await prisma.fundSource.create({
        data,
    });
};

const getAllFundSources = async () => {
    return await prisma.fundSource.findMany({
        where: {
            isDeleted: false
        },
        orderBy: {
            name: "asc",
        },
    });
};

const getFundSourceById = async (id: string) => {
    const isExistSource = await prisma.fundSource.findUnique({
        where: { id, isDeleted: false },
    });

    if (!isExistSource) {
        throw new AppError(404, "Fund source not found!")
    }

    return isExistSource
};

const updateFundSource = async (
    id: string,
    data: Partial<TFundSource>
) => {
    const isExistSource = await prisma.fundSource.findUnique({
        where: { id, isDeleted: false },
    });

    if (!isExistSource) {
        throw new AppError(404, "Fund source not found!")
    }
    const updateFoundSource = await prisma.fundSource.update({
        where: { id },
        data,
    });
    return updateFoundSource
};

const deleteFundSource = async (id: string) => {
    const isExistSource = await prisma.fundSource.findUnique({
        where: { id, isDeleted: false },
    });

    if (!isExistSource) {
        throw new AppError(404, "Fund source not found!")
    }

    const softDeleteFundSource = await prisma.fundSource.update({
        where: { id },
        data: {
            isDeleted: true
        }
    });

    return softDeleteFundSource
};

export const fundSourceService = {
    createFundSource,
    getAllFundSources,
    getFundSourceById,
    updateFundSource,
    deleteFundSource
}