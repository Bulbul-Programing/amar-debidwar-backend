import QueryBuilder from "../../builder/QueryBuilder";
import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { paginateCalculation } from "../../utils/paginateCalculation";
import { TBudget } from "./budge.interface";

const createBudget = async (payload: TBudget) => {
    const fundSourceExist = await prisma.fundSource.findUnique({
        where: { id: payload.fundSourceId, isDeleted: false }
    })

    if (!fundSourceExist) {
        throw new AppError(404, "Fund source not found!")
    }

    const result = await prisma.budget.create({
        data: payload
    })

    return result
}

const getAllBudgets = async (options: any) => {
    const { page, limit, skip } = paginateCalculation(options)

    const budgeQueryBuilder = new QueryBuilder(options)
        .searching(["title"])
        .sort()
        .paginate()

    delete budgeQueryBuilder.prismaQuery.where.isActive
    delete budgeQueryBuilder.prismaQuery.orderBy.createdAt

    const result = await prisma.budget.findMany({
        ...budgeQueryBuilder.prismaQuery,
        include: {
            fundSource: true
        }
    })

    const total = await prisma.budget.count({
        where: budgeQueryBuilder.prismaQuery.where
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

const getSingleBudget = async (id: string) => {
    const result = await prisma.budget.findUnique({
        where: { id, isDeleted: false },
        include: {
            fundSource: true,
            projects: true
        }
    })

    if (!result) {
        throw new AppError(404, "Budget not found!")
    }

    return result
}

const updateBudget = async (id: string, payload: Partial<TBudget>) => {
    const isExistBudget = await prisma.budget.findUnique({
        where: { id, isDeleted: false }
    })

    if (!isExistBudget) {
        throw new AppError(404, "Budget not found!")
    }

    if (payload.fundSourceId) {
        const fundSourceExist = await prisma.fundSource.findUnique({
            where: { id: payload.fundSourceId, isDeleted: false }
        })

        if (!fundSourceExist) {
            throw new AppError(404, "Fund source not found!")
        }
    }

    const result = await prisma.budget.update({
        where: { id },
        data: payload
    })

    return result
}

const deleteBudget = async (id: string) => {
    const isExistBudget = await prisma.budget.findUnique({
        where: { id, isDeleted: false }
    })

    if (!isExistBudget) {
        throw new AppError(404, "Budget not found!")
    }

    await prisma.budget.update({
        where: { id },
        data: {
            isDeleted: true
        }
    })

    return null
}

const getBudgetsByFundSource = async (fundSourceId: string, options: any) => {
    const { page, limit, skip } = paginateCalculation(options)
    const isExistFundSource = await prisma.fundSource.findUnique({
        where: { id: fundSourceId }
    })

    if (!isExistFundSource) {
        throw new AppError(404, "Fund source not found!")
    }

    const budgeQueryBuilder = new QueryBuilder(options)
        .searching(["description", "title", "fundSource.name", "fundSource.ministry"])
        .sort()
        .paginate()

    delete budgeQueryBuilder.prismaQuery.where.isActive
    delete budgeQueryBuilder.prismaQuery.orderBy.createdAt

    const { where, ...rest } = budgeQueryBuilder.prismaQuery

    const result = await prisma.budget.findMany({
        where: {
            ...where,
            fundSourceId: fundSourceId
        },
        ...rest,
        include: {
            fundSource: true
        }
    })

    const total = await prisma.budget.count({
        where: {
            ...where,
            fundSourceId: fundSourceId
        }
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


export const budgetService = {
    createBudget,
    getAllBudgets,
    getSingleBudget,
    updateBudget,
    deleteBudget,
    getBudgetsByFundSource
}