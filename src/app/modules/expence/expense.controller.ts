import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { fundSourceService } from "./expense.service";

const createFundSource = catchAsync(async (req: Request, res: Response) => {
    const fundData = req.body
    const result = await fundSourceService.createFundSource(fundData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Fund source created successfully!",
        data: result
    })
})

const getAllFundSources = catchAsync(async (req: Request, res: Response) => {
    const result = await fundSourceService.getAllFundSources();

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "All fund source retrieve successfully!",
        data: result
    })
})

const getFundSourceById = catchAsync(async (req: Request, res: Response) => {
    const fundSourceId = req.params.id as string
    const result = await fundSourceService.getFundSourceById(fundSourceId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Fund source retrieve successfully!",
        data: result
    })
})

const updateFundSource = catchAsync(async (req: Request, res: Response) => {
    const fundSourceId = req.params.id as string
    const updateData = req.body
    const result = await fundSourceService.updateFundSource(fundSourceId, updateData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Fund source update successfully!",
        data: result
    })
})

const deleteFundSource = catchAsync(async (req: Request, res: Response) => {
    const fundSourceId = req.params.id as string
    const result = await fundSourceService.deleteFundSource(fundSourceId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Fund source delete successfully!",
        data: result
    })
})

export const fundSourceController = {
    createFundSource,
    getAllFundSources,
    getFundSourceById,
    updateFundSource,
    deleteFundSource
}