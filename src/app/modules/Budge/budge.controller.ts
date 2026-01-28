import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { budgetService } from "./budge.service";

const createBudget = catchAsync(async (req: Request, res: Response) => {
    const budgetData = req.body
    const result = await budgetService.createBudget(budgetData)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Budget created successfully!",
        data: result
    })
})


const getAllBudgets = catchAsync(async (req: Request, res: Response) => {
    const result = await budgetService.getAllBudgets()

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Budgets retrieved successfully!",
        data: result
    })
})


const getSingleBudget = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = await budgetService.getSingleBudget(id)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Budget retrieved successfully!",
        data: result
    })
})


const updateBudget = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string
    const updateData = req.body

    const result = await budgetService.updateBudget(id, updateData)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Budget updated successfully!",
        data: result
    })
})


const deleteBudget = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    await budgetService.deleteBudget(id)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Budget deleted successfully!",
        data: null
    })
})


export const budgetController = {
    createBudget,
    getAllBudgets,
    getSingleBudget,
    updateBudget,
    deleteBudget
}