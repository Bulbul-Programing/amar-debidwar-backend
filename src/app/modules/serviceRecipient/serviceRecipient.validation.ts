import { optional, z } from "zod";

const createServiceRecipientSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Recipient name must be at least 2 characters long")
        .max(100, "Recipient name cannot exceed 100 characters"),

    phone: z
        .string()
        .trim()
        .regex(
            /^(\+8801|01)[3-9]\d{8}$/,
            "Phone number must be a valid Bangladeshi mobile number"
        ),

    nidNumber: z
        .string()
        .trim()
        .min(10, "NID number must be at least 10 characters")
        .max(20, "NID number cannot exceed 20 characters"),

    address: z
        .string()
        .trim()
        .min(5, "Address must be at least 5 characters long")
        .max(255, "Address cannot exceed 255 characters"),

    unionId: z
        .uuid("Union ID must be a valid UUID"),

    villageId: z
        .uuid("Village ID must be a valid UUID"),

    donationId: z
        .uuid("Donation section ID must be a valid UUID"),
});

const updateServiceRecipientSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Recipient name must be at least 2 characters long")
        .max(100, "Recipient name cannot exceed 100 characters")
        .optional(),

    phone: z
        .string()
        .trim()
        .regex(
            /^(\+8801|01)[3-9]\d{8}$/,
            "Phone number must be a valid Bangladeshi mobile number"
        )
        .optional()
    ,

    address: z
        .string()
        .trim()
        .min(5, "Address must be at least 5 characters long")
        .max(255, "Address cannot exceed 255 characters")
        .optional(),

    unionId: z
        .uuid("Union ID must be a valid UUID")
        .optional(),

    villageId: z
        .uuid("Village ID must be a valid UUID")
        .optional(),

    donationId: z
        .uuid("Donation section ID must be a valid UUID")
        .optional(),
})

export const serviceREcipientSchema = {
    createServiceRecipientSchema,
    updateServiceRecipientSchema
}