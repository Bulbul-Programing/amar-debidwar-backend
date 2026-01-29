import z from "zod";

export const createComplainSchema = z.object({
    title: z.string({
        error: "Title is required",
    }),
    description: z.string({
        error: "Description is required",
    }),
    photo: z.string().optional(),
    location: z.string({
        error: "Location is required",
    }),
    complainCategory: z.string({
        error: "Complaint category is required",
    }),
})

export const updateComplainSchema = createComplainSchema.partial();
