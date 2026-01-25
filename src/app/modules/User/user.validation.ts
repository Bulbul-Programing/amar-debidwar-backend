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

    role: z.enum(['MP', "ADMIN", "USER"])
});


export const userValidationSchema = {
    createUserSchema
}
