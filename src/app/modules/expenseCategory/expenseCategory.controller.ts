import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { expenseCategoryService } from "./expenseCategory.service";
import { sendResponse } from "../../utils/sendResponse";

const createExpenseCategory = catchAsync(async (req: Request, res: Response) => {
    const categoryData = req.body;

    const result = await expenseCategoryService.createExpenseCategory(categoryData);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Expense category created successfully!",
        data: result,
    });
});

const getAllExpenseCategories = catchAsync(async (_req: Request, res: Response) => {
    const result = await expenseCategoryService.getAllExpenseCategories();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Expense categories retrieved successfully!",
        data: result,
    });
});

const getExpenseCategoryById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = await expenseCategoryService.getExpenseCategoryById(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Expense category retrieved successfully!",
        data: result,
    });
});

const updateExpenseCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string
    const categoryData = req.body;

    const result = await expenseCategoryService.updateExpenseCategory(id, categoryData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Expense category updated successfully!",
        data: result,
    });
});

const deleteExpenseCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = await expenseCategoryService.deleteExpenseCategory(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Expense category deleted successfully!",
        data: result,
    });
});

export const expenseCategoryController = {
    createExpenseCategory,
    getAllExpenseCategories,
    getExpenseCategoryById,
    updateExpenseCategory,
    deleteExpenseCategory
}