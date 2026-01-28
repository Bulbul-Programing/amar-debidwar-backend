import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { expenseService } from "./expense.service";
import { sendResponse } from "../../utils/sendResponse";

// Create Expense
const createExpense = catchAsync(async (req: Request, res: Response) => {
    const expenseData = req.body;
    const result = await expenseService.addExpense(expenseData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Expense added successfully!",
        data: result,
    });
});

// Get All Expenses
const getAllExpense = catchAsync(async (req: Request, res: Response) => {
    const result = await expenseService.getAllExpense();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Expenses retrieved successfully!",
        data: result,
    });
});

// Get Single Expense
const getSingleExpense = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string
    const result = await expenseService.getSingleExpense(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Expense retrieved successfully!",
        data: result,
    });
});

// Update Expense
const updateExpense = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string
    const updateData = req.body;

    const result = await expenseService.updateExpense(id, updateData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Expense updated successfully!",
        data: result,
    });
});

export const expenseController = {
    createExpense,
    getAllExpense,
    getSingleExpense,
    updateExpense,
};
