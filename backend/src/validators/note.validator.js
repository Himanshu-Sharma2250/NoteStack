import {z} from "zod";

export const noteSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim(),
    status: z.string(),
    priority: z.string()
})