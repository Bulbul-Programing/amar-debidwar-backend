import { prisma } from "../../DBconfig/db";
import AppError from "../../error/AppError";
import { TProject } from "./project.interface";

const createProject = async (data: TProject) => {
    const isExistBudge = await prisma.budget.findUnique({
        where: { id: data.budgetId, isDeleted: false }
    })

    if (!isExistBudge) {
        throw new AppError(404, "Budge not found!")
    }

    const result = await prisma.project.create({
        data: data
    })
    return result
};

const getAllProjects = async () => {
    return await prisma.project.findMany({
        where: { isDeleted: false },
        include: { budget: true },
        orderBy: { title: "asc" },
    });
};

const getProjectById = async (id: string) => {
    const isExistProject = await prisma.project.findUnique({
        where: { id, isDeleted: false },
        include: { budget: true, expenses: true },
    });
    if (!isExistProject) {
        throw new AppError(404, "Budge not found!")
    }

    return isExistProject
};

const updateProject = async (id: string, data: Partial<TProject>) => {
    const isExistProject = await prisma.project.findUnique({
        where: { id },
        include: { budget: true, expenses: true },
    });
    if (!isExistProject) {
        throw new AppError(404, "Budge not found!")
    }

    if (data.budgetId) {
        const isExistBudge = await prisma.budget.findUnique({
            where: { id: data.budgetId, isDeleted: false }
        })

        if (!isExistBudge) {
            throw new AppError(404, "Budge not found!")
        }
    }

    return await prisma.project.update({
        where: { id },
        data,
    });
};

const deleteProject = async (id: string) => {
    const isExistProject = await prisma.project.findUnique({
        where: { id },
        include: { budget: true, expenses: true },
    });
    if (!isExistProject) {
        throw new AppError(404, "Budge not found!")
    }

    const deleteProject = await prisma.project.update({
        where: { id },
        data: {
            isDeleted: true
        }
    })

    return null
};

export const projectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
}