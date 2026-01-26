import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { donationService } from "./donationSection.service";

const createDonationSection = catchAsync(async (req: Request, res: Response) => {
    const donationSectionData = req.body
    const result = await donationService.createDonationSection(donationSectionData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Donation section created successfully!",
        data: result
    })
})

const getAllDonationSection = catchAsync(async (req: Request, res: Response) => {
    const result = await donationService.getAllDonationSection();

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "All donation section retrieve successfully!",
        data: result
    })
})

const getSingleDonationSection = catchAsync(async (req: Request, res: Response) => {
    const donationSectionId = req.params.id as string
    const result = await donationService.getSingleDonationSection(donationSectionId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "single donation section retrieve successfully!",
        data: result
    })
})

const updateDonationSection = catchAsync(async (req: Request, res: Response) => {
    const donationSectionId = req.params.id as string
    const updateData = req.body
    const result = await donationService.updateDonationSection(donationSectionId, updateData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Donation section update successfully!",
        data: result
    })
})

const deleteDonationSection = catchAsync(async (req: Request, res: Response) => {
    const donationSectionId = req.params.id as string
    const result = await donationService.deleteDonationSection(donationSectionId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Donation delete successfully!",
        data: result
    })
})

export const donationSectionController = {
    createDonationSection,
    getAllDonationSection,
    getSingleDonationSection,
    updateDonationSection,
    deleteDonationSection
}