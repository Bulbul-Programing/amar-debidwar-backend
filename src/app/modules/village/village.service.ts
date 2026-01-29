
import QueryBuilder from "../../builder/QueryBuilder";
import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { paginateCalculation } from "../../utils/paginateCalculation";
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

const getAllVillages = async (options: any) => {
    const { page, limit, skip } = paginateCalculation(options)

    const villagesQueryBuilder = new QueryBuilder(options)
        .searching(["name"])
        .sort()
        .fields()
        .paginate()

    delete villagesQueryBuilder.prismaQuery.where.isActive
    delete villagesQueryBuilder.prismaQuery.where.isDeleted
    delete villagesQueryBuilder.prismaQuery.orderBy.createdAt

    const result = await prisma.village.findMany({
        ...villagesQueryBuilder.prismaQuery
    })

    const total = await prisma.village.count({
        where: villagesQueryBuilder.prismaQuery.where
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