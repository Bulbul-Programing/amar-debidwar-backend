import QueryBuilder from "../../builder/QueryBuilder";
import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { paginateCalculation } from "../../utils/paginateCalculation";
import { TFundSource } from "./fundSource.interface";

const createFundSource = async (data: TFundSource) => {
    return await prisma.fundSource.create({
        data,
    });
};

const getAllFundSources = async (options: any) => {
    const { page, limit, skip } = paginateCalculation(options)

    const fundSourceQueryBuilder = new QueryBuilder(options)
        .searching(["name", "ministry"])
        .sort()
        .paginate()

    delete fundSourceQueryBuilder.prismaQuery.where.isActive
    delete fundSourceQueryBuilder.prismaQuery.orderBy.createdAt

    const result = await prisma.fundSource.findMany({
        ...fundSourceQueryBuilder.prismaQuery
    })

    const total = await prisma.fundSource.count({
        where: fundSourceQueryBuilder.prismaQuery.where
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

    return null
};

export const fundSourceService = {
    createFundSource,
    getAllFundSources,
    getFundSourceById,
    updateFundSource,
    deleteFundSource
}