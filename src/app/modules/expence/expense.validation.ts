import { z } from "zod";

const createExpenseSchema = z.object({
    description: z
        .string()
        .trim()
        .min(5, "Description must be at least 5 characters long")
        .max(500, "Description cannot exceed 500 characters"),

    amount: z
        .number()
        .positive("Amount must be a positive number"),

    expenseDate: z
        .coerce
        .date({
            error: "Expense date must be a valid date",
        }),

    chalanImage: z
        .url("Chalan image must be a valid URL")
        .optional()
        .nullable(),

    projectId: z
        .uuid("Project ID must be a valid UUID"),

    categoryId: z
        .uuid("Expense category ID must be a valid UUID"),
});

const updateExpenseSchema = createExpenseSchema.partial();

export const expenseValidation = {
    createExpenseSchema,
    updateExpenseSchema,
};