import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const userInfo = req.body
    const result = await userService.createUser(userInfo);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully!",
        data: result
    })
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const userInfo = req.body
    const result = await userService.crateAdmin(userInfo);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin created successfully!",
        data: result
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUsers();

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "All user retrieve successfully!",
        data: result
    })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id as string
    const result = await userService.getSingleUser(userId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User info retrieve successfully!",
        data: result
    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as string
    const payload = req.body
    const result = await userService.updateUser(userId, payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User update successfully!",
        data: result
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as string
    const result = await userService.deleteUser(userId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User delete successfully!",
        data: result
    })
})

const blockedUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId as string
    const result = await userService.blockedUser(userId);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User blocked successfully!",
        data: result
    })
})
export const userController = {
    createUser,
    createAdmin,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    blockedUser
}