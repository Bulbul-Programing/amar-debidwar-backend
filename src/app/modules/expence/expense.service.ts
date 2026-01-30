import QueryBuilder from "../../builder/QueryBuilder";
import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { paginateCalculation } from "../../utils/paginateCalculation";
import { TExpense } from "./expense.interface";

const addExpense = async (data: TExpense) => {
    const isExistCategory = await prisma.expenseCategory.findUnique({
        where: {
            id: data.categoryId,
            isActive: true
        }
    })

    if (!isExistCategory) {
        throw new AppError(404, "Expense category not found!")
    }

    const isExistProject = await prisma.project.findUnique({
        where: {
            id: data.projectId,
            isDeleted: false
        }
    })

    if (!isExistProject) {
        throw new AppError(404, "Project not found!")
    }

    const result = await prisma.$transaction(async (tnx) => {
        const expense = await tnx.expense.create({
            data: data
        })
        // update project actual cost
        const updatedActualCost = await tnx.project.update({
            where: { id: data.projectId },
            data: {
                actualCost: isExistProject.actualCost! + data.amount
            }
        })
        return expense
    })

    return result
};

const getAllExpense = async (options: any) => {
    const { page, limit, skip } = paginateCalculation(options)

    const expenseQueryBuilder = new QueryBuilder(options)
        .searching(["description", "expenseCategory.name"])
        .sort()
        .paginate()

    delete expenseQueryBuilder.prismaQuery.where.isActive
    delete expenseQueryBuilder.prismaQuery.where.isDeleted
    delete expenseQueryBuilder.prismaQuery.orderBy.createdAt

    const result = await prisma.expense.findMany({
        ...expenseQueryBuilder.prismaQuery,
        include: {
            expenseCategory: true,
            project: true
        }
    })

    const total = await prisma.expense.count({
        where: expenseQueryBuilder.prismaQuery.where
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

const getSingleExpense = async (id: string) => {
    const isExistExpense = await prisma.expense.findUnique({
        where: { id },
        include: {
            expenseCategory: true,
            project: true
        }
    });

    if (!isExistExpense) {
        throw new AppError(404, "Expense not found!")
    }

    return isExistExpense
};

const updateExpense = async (
    id: string,
    data: Partial<TExpense>
) => {
    const isExistExpense = await prisma.expense.findUnique({
        where: { id },
        include: {
            project: true,
            expenseCategory: true
        }
    });

    if (!isExistExpense) {
        throw new AppError(404, "Expense not found!")
    }

    const result = await prisma.$transaction(async (tnx) => {
        const updateExpense = await prisma.expense.update({
            where: { id },
            data,
        });

        if (data.amount && data.amount !== isExistExpense.amount) {
            const amountDifference = data.amount - isExistExpense.amount

            // update project actual cost
            const updatedActualCost = await tnx.project.update({
                where: { id: isExistExpense.projectId },
                data: {
                    actualCost: isExistExpense.project.actualCost! + (amountDifference)
                }
            })
        }
        return updateExpense
    })
    return result
};

export const expenseService = {
    addExpense,
    getAllExpense,
    getSingleExpense,
    updateExpense
}