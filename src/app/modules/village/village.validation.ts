import z from "zod";

export const createVillageSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Village name must be at least 2 characters long")
        .max(100, "Village name cannot exceed 100 characters"),

    population: z
        .number()
        .int("Population must be an integer")
        .min(0, "Population cannot be negative")
        .optional()
        .nullable(),

    unionId: z
        .uuid("Union ID must be a valid UUID"),
});

export const updateVillageSchema = createVillageSchema.partial()