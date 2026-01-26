import z from "zod";
import { partial } from "zod/mini";

export const createProjectSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Project title must be at least 3 characters long")
        .max(150, "Project title cannot exceed 150 characters"),

    description: z
        .string()
        .trim()
        .min(10, "Project description must be at least 10 characters long")
        .max(3000, "Project description cannot exceed 3000 characters"),

    location: z
        .string()
        .trim()
        .min(3, "Location must be at least 3 characters long")
        .max(255, "Location cannot exceed 255 characters"),

    estimatedCost: z
        .number()
        .positive("Estimated cost must be a positive number"),

    actualCost: z
        .number()
        .positive("Actual cost must be a positive number")
        .optional()
        .nullable(),

    budgetId: z
        .uuid("Budget ID must be a valid UUID"),
});

export const updateProjectSchema = createProjectSchema.partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field must be provided to update the budget",
        }
    );