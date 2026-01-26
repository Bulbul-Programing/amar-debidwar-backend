import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
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

const getAllBudgets = async () => {
    const result = await prisma.budget.findMany({
        include: {
            fundSource: true,
            projects: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return result
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


export const budgetService = {
    createBudget,
    getAllBudgets,
    getSingleBudget,
    updateBudget,
    deleteBudget
}