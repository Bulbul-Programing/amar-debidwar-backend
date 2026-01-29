import QueryBuilder from "../../builder/QueryBuilder";
import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { paginateCalculation } from "../../utils/paginateCalculation";
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

const getAllUnions = async (options: any) => {
    const { page, limit, skip } = paginateCalculation(options)
    const unionsQueryBuilder = new QueryBuilder(options)
        .searching(["name"])
        .sort()
        .fields()
        .paginate()

    delete unionsQueryBuilder.prismaQuery.where.isActive
    delete unionsQueryBuilder.prismaQuery.where.isDeleted
    delete unionsQueryBuilder.prismaQuery.orderBy.createdAt

    const result = await prisma.union.findMany({
        ...unionsQueryBuilder.prismaQuery
    })

    const total = await prisma.union.count({
        where: unionsQueryBuilder.prismaQuery.where
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