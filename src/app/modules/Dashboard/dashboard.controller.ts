import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { dashboardService } from "./dashboard.service";

const mpDashboardHome = catchAsync(async (req: Request, res: Response) => {
    const result = await dashboardService.mpDashboardHomeApi();
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "MP dashboard home data retrieved successfully!",
        data: result,
    });
});

export const dashboardController = {
    mpDashboardHome
}