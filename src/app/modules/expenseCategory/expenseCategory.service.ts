import QueryBuilder from "../../builder/QueryBuilder";
import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { paginateCalculation } from "../../utils/paginateCalculation";
import { TExpenseCategory } from "./expenseCategory.interface";

const createExpenseCategory = async (data: TExpenseCategory) => {
    return await prisma.expenseCategory.create({
        data,
    });
};

const getAllExpenseCategories = async (options: any) => {
    const { page, limit, skip } = paginateCalculation(options)

    const expenseCategoryQueryBuilder = new QueryBuilder(options)
        .searching(["name", "nameBn"])
        .sort()
        .paginate()

    delete expenseCategoryQueryBuilder.prismaQuery.where.isActive
    delete expenseCategoryQueryBuilder.prismaQuery.where.isDeleted
    delete expenseCategoryQueryBuilder.prismaQuery.orderBy.createdAt

    const result = await prisma.expenseCategory.findMany({
        ...expenseCategoryQueryBuilder.prismaQuery
    })

    const total = await prisma.expenseCategory.count({
        where: expenseCategoryQueryBuilder.prismaQuery.where
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


    return await prisma.expenseCategory.findMany({
        include: { expenses: true },
        orderBy: { createdAt: "desc" },
    });
};

const getExpenseCategoryById = async (id: string) => {
    const isExistExpenseCategory = await prisma.expenseCategory.findUnique({
        where: { id, isActive: true }
    })

    if (!isExistExpenseCategory) {
        throw new AppError(404, "Expense category not found!")
    }
    return await prisma.expenseCategory.findUnique({
        where: { id },
        include: { expenses: true },
    });
};

const updateExpenseCategory = async (id: string, data: Partial<TExpenseCategory>) => {
    const isExistExpenseCategory = await prisma.expenseCategory.findUnique({
        where: { id, isActive: true }
    })

    if (!isExistExpenseCategory) {
        throw new AppError(404, "Expense category not found!")
    }

    return await prisma.expenseCategory.update({
        where: { id },
        data,
    });
};

const blockExpenseCategory = async (id: string) => {
    const isExistExpenseCategory = await prisma.expenseCategory.findUnique({
        where: { id }
    })

    if (!isExistExpenseCategory) {
        throw new AppError(404, "Expense category not found!")
    }

    return await prisma.expenseCategory.update({
        where: { id },
        data: {
            isActive: !isExistExpenseCategory.isActive
        }
    });
};

export const expenseCategoryService = {
    createExpenseCategory,
    getAllExpenseCategories,
    getExpenseCategoryById,
    updateExpenseCategory,
    blockExpenseCategory
}