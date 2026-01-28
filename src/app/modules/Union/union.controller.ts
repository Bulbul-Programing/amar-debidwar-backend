import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { fundSourceService } from "./union.service";
import { sendResponse } from "../../utils/sendResponse";

const createUnion = catchAsync(async (req: Request, res: Response) => {
    const result = await fundSourceService.createUnion(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Union created successfully!",
        data: result,
    });
});

const getAllUnions = catchAsync(async (_req: Request, res: Response) => {
    const result = await fundSourceService.getAllUnions();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Unions retrieved successfully!",
        data: result,
    });
});

const getSingleUnion = catchAsync(async (req: Request, res: Response) => {
    const result = await fundSourceService.getSingleUnion(req.params.id as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Union retrieved successfully!",
        data: result,
    });
});

const updateUnion = catchAsync(async (req: Request, res: Response) => {
    const unionId = req.params.id as string
    const result = await fundSourceService.updateUnion(unionId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Union updated successfully!",
        data: result,
    });
});

const deleteUnion = catchAsync(async (req: Request, res: Response) => {
    const unionId = req.params.id as string
    await fundSourceService.deleteUnion(unionId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Union deleted successfully!",
        data: null,
    });
});

export const UnionController = {
    createUnion,
    getAllUnions,
    getSingleUnion,
    updateUnion,
    deleteUnion,
};
