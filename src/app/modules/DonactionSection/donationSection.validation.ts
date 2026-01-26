import z from "zod";

export const donationSectionCreateValidation = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name cannot exceed 100 characters"),

    photo: z.url()
});

export const donationSectionUpdateValidation = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name cannot exceed 100 characters")
        .optional()
    ,

    photo: z.url().optional()
});