import z from "zod";

export const createExpenseCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters long")
        .max(100, "Category name cannot exceed 100 characters"),

    nameBn: z
        .string()
        .trim()
        .min(2, "Category name (Bangla) must be at least 2 characters long")
        .max(100, "Category name (Bangla) cannot exceed 100 characters")
        .optional()
        .nullable(),
});

export const updateExpenseCategorySchema = createExpenseCategorySchema.partial()