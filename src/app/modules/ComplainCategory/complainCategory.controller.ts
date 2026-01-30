import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { complaintCategoryService } from "./complainCategory.service";

const createComplaintCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await complaintCategoryService.createComplaintCategory(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Complaint category created successfully!",
        data: result,
    });
});

const getAllComplaintCategories = catchAsync(async (req: Request, res: Response) => {
    const result = await complaintCategoryService.getAllComplaintCategories(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Complaint categories retrieved successfully!",
        data: result,
    });
});

const getSingleComplaintCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = await complaintCategoryService.getSingleComplaintCategory(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Complaint category retrieved successfully!",
        data: result,
    });
});

const updateComplaintCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = await complaintCategoryService.updateComplaintCategory(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Complaint category updated successfully!",
        data: result,
    });
});

const deleteComplaintCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    await complaintCategoryService.deleteComplaintCategory(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Complaint category deleted successfully!",
        data: null,
    });
});

export const complaintCategoryController = {
    createComplaintCategory,
    getAllComplaintCategories,
    getSingleComplaintCategory,
    updateComplaintCategory,
    deleteComplaintCategory,
};
