import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { complainService } from "./complain.service";

const createComplain = catchAsync(async (req: Request, res: Response) => {
    const result = await complainService.createComplain(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Complain created successfully!",
        data: result,
    });
});

const getAllComplains = catchAsync(async (_req: Request, res: Response) => {
    const result = await complainService.getAllComplains();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Complains retrieved successfully!",
        data: result,
    });
});

const getSingleComplain = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = await complainService.getSingleComplain(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Complain retrieved successfully!",
        data: result,
    });
});

const updateComplain = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = await complainService.updateComplain(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Complain updated successfully!",
        data: result,
    });
});

const deleteComplain = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    await complainService.deleteComplain(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Complain deleted successfully!",
        data: null,
    });
});

export const complainController = {
    createComplain,
    getAllComplains,
    getSingleComplain,
    updateComplain,
    deleteComplain,
};
