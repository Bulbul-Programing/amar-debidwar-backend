import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { fundSourceService } from "./village.service";
import { sendResponse } from "../../utils/sendResponse";

const createVillage = catchAsync(async (req: Request, res: Response) => {
    const villageData = req.body;

    const result = await fundSourceService.createVillage(villageData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Village created successfully!",
        data: result,
    });
});

const getAllVillages = catchAsync(async (_req: Request, res: Response) => {
    const result = await fundSourceService.getAllVillages();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Villages retrieved successfully!",
        data: result,
    });
});

const getSingleVillage = catchAsync(async (req: Request, res: Response) => {
    const  id  = req.params.id as string

    const result = await fundSourceService.getSingleVillage(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Village retrieved successfully!",
        data: result,
    });
});

const updateVillage = catchAsync(async (req: Request, res: Response) => {
    const  id  = req.params.id as string
    const villageData = req.body;

    const result = await fundSourceService.updateVillage(id, villageData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Village updated successfully!",
        data: result,
    });
});

const deleteVillage = catchAsync(async (req: Request, res: Response) => {
    const  id  = req.params.id as string
    await fundSourceService.deleteVillage(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Village deleted successfully!",
        data: null,
    });
});

export const VillageController = {
    createVillage,
    getAllVillages,
    getSingleVillage,
    updateVillage,
    deleteVillage,
};
