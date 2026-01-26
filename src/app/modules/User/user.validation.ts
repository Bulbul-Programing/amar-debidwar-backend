import z from "zod";
import { UserRole } from "./user.interface";

const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name cannot exceed 100 characters"),

    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password cannot exceed 20 characters"),

    profilePhoto: z.url().optional(),

    email: z
        .string()
        .trim()
        .email("Please provide a valid email address"),

    phone: z
        .string()
        .trim()
        .regex(
            /^(\+8801|01)[3-9]\d{8}$/,
            "Phone number must be a valid Bangladeshi mobile number"
        ),

    role: z.enum(['MP', "ADMIN", "USER"]).default("USER")
});

const updateUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name must be at least 2 characters long')
        .max(100, 'Name cannot exceed 100 characters')
        .optional(),

    phone: z
        .string()
        .trim()
        .regex(
            /^(\+8801|01)[3-9]\d{8}$/,
            'Phone number must be a valid Bangladeshi mobile number'
        )
        .optional(),

    profilePhoto: z
        .url('Profile photo must be a valid URL')
        .nullable()
        .optional(),

    oldPassword: z
        .string()
        .min(6, 'Old password must be at least 6 characters')
        .optional(),

    newPassword: z
        .string()
        .min(6, 'New password must be at least 6 characters')
        .optional(),

    confirmPassword: z
        .string()
        .min(6, 'Confirm password must be at least 6 characters')
        .optional(),
})
    .refine(data => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update',
    })
    .refine(
        data => {
            if (data.newPassword || data.confirmPassword || data.oldPassword) {
                return (
                    data.oldPassword &&
                    data.newPassword &&
                    data.confirmPassword &&
                    data.newPassword === data.confirmPassword
                )
            }
            return true
        },
        {
            message:
                'To change password, oldPassword, newPassword, and confirmPassword are required and must match',
            path: ['confirmPassword'],
        }
    )

export const userValidationSchema = {
    createUserSchema,
    updateUserSchema
}
