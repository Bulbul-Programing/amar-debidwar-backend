import QueryBuilder from "../../builder/QueryBuilder";
import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { paginateCalculation } from "../../utils/paginateCalculation";
import { TComplaintCategory } from "./complainCategory.interface";

const createComplaintCategory = async (data: TComplaintCategory) => {
    const isExist = await prisma.complaintCategory.findFirst({
        where: { name: data.name },
    });

    if (isExist) {
        throw new AppError(400, "Complaint category already exists!");
    }

    return await prisma.complaintCategory.create({
        data,
    });
};

const getAllComplaintCategories = async (options: any) => {
    const { page, limit, skip } = paginateCalculation(options)

    const complainCategoryQueryBuilder = new QueryBuilder(options)
        .searching(["name", "nameBn"])
        .sort()
        .paginate()

    delete complainCategoryQueryBuilder.prismaQuery.where.isActive
    delete complainCategoryQueryBuilder.prismaQuery.where.isDeleted
    delete complainCategoryQueryBuilder.prismaQuery.orderBy.createdAt

    const result = await prisma.complaintCategory.findMany({
        ...complainCategoryQueryBuilder.prismaQuery
    })

    const total = await prisma.complaintCategory.count({
        where: complainCategoryQueryBuilder.prismaQuery.where
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

const getSingleComplaintCategory = async (id: string) => {
    const category = await prisma.complaintCategory.findUnique({
        where: { id },
    });

    if (!category) {
        throw new AppError(404, "Complaint category not found!");
    }

    return category;
};

const updateComplaintCategory = async (
    id: string,
    data: Partial<TComplaintCategory>
) => {
    const isExist = await prisma.complaintCategory.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new AppError(404, "Complaint category not found!");
    }

    return await prisma.complaintCategory.update({
        where: { id },
        data,
    });
};

const deleteComplaintCategory = async (id: string) => {
    const isExist = await prisma.complaintCategory.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new AppError(404, "Complaint category not found!");
    }

    await prisma.complaintCategory.delete({
        where: { id },
    });

    return null;
};

export const complaintCategoryService = {
    createComplaintCategory,
    getAllComplaintCategories,
    getSingleComplaintCategory,
    updateComplaintCategory,
    deleteComplaintCategory,
};
