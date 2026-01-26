import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { projectService } from "./project.service";


const createProject = catchAsync(async (req: Request, res: Response) => {
    const projectData = req.body;
    const result = await projectService.createProject(projectData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Project created successfully!",
        data: result,
    });
});

const getAllProjects = catchAsync(async (_req: Request, res: Response) => {
    const result = await projectService.getAllProjects();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Projects retrieved successfully!",
        data: result,
    });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = await projectService.getProjectById(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Project retrieved successfully!",
        data: result,
    });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string
    const projectData = req.body;

    const result = await projectService.updateProject(id, projectData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Project updated successfully!",
        data: result,
    });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = await projectService.deleteProject(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Project deleted successfully!",
        data: result,
    });
});

export const projectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
}