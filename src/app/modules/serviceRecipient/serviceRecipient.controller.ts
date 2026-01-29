import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { serviceRecipientService } from "./serviceRecipient.service";

const createServiceRecipient = catchAsync(async (req: Request, res: Response) => {
    const recipientData = req.body;
    const result = await serviceRecipientService.createServiceRecipient(recipientData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Service recipient created successfully!",
        data: result,
    });
});

const getAllServiceRecipients = catchAsync(async (_req: Request, res: Response) => {
    const result = await serviceRecipientService.getAllServiceRecipients();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Service recipients retrieved successfully!",
        data: result,
    });
});

const getServiceRecipientById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string
    const result = await serviceRecipientService.getServiceRecipientById(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Service recipient retrieved successfully!",
        data: result,
    });
});

const updateServiceRecipient = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string
    const updateData = req.body;
    const result = await serviceRecipientService.updateServiceRecipient(id, updateData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Service recipient updated successfully!",
        data: result,
    });
});

const deleteServiceRecipient = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string
    const result = await serviceRecipientService.deleteServiceRecipient(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Service recipient deleted successfully!",
        data: null,
    });
});

export const serviceRecipientController = {
    createServiceRecipient,
    getAllServiceRecipients,
    getServiceRecipientById,
    updateServiceRecipient,
    deleteServiceRecipient
}