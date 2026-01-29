import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
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

const getAllComplaintCategories = async () => {
    return await prisma.complaintCategory.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
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
