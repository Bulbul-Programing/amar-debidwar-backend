import z from "zod";

export const createBudgetSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Budget title must be at least 3 characters long")
        .max(150, "Budget title cannot exceed 150 characters"),

    description: z
        .string()
        .trim()
        .min(10, "Budget description must be at least 10 characters long")
        .max(2000, "Budget description cannot exceed 2000 characters"),

    budgetAmount: z
        .number()
        .positive("Budget amount must be a positive number"),

    fiscalYear: z
        .string()
        .trim()
        .regex(
            /^\d{4}(-\d{4})?$/,
            "Fiscal year must be in format YYYY or YYYY-YYYY (e.g. 2025 or 2025-2026)"
        ),

    receiveDate: z
        .coerce
        .date({
            error: "Receive date must be a valid date",
        }),

    fundSourceId: z
        .uuid("Fund source ID must be a valid UUID"),
});

export const updateBudgetSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Budget title must be at least 3 characters long")
        .max(150, "Budget title cannot exceed 150 characters")
        .optional(),

    description: z
        .string()
        .trim()
        .min(5, "Budget description must be at least 5 characters long")
        .max(2000, "Budget description cannot exceed 2000 characters")
        .optional(),

    budgetAmount: z
        .number()
        .positive("Budget amount must be a positive number")
        .optional(),

    fiscalYear: z
        .string()
        .trim()
        .regex(
            /^\d{4}(-\d{4})?$/,
            "Fiscal year must be in format YYYY or YYYY-YYYY (e.g. 2025 or 2025-2026)"
        )
        .optional(),

    receiveDate: z
        .coerce
        .date({
            error: "Receive date must be a valid date",
        })
        .optional(),

    fundSourceId: z
        .uuid("Fund source ID must be a valid UUID")
        .optional(),
})
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field must be provided to update the budget",
        }
    );