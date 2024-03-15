import { z } from "zod";


export const createTaskSchema = z.object({

    content: z
    .string()
    .min(4, "Task content must be at least 4 characters long"),
    expiresAt: z
    .string()
    .optional(),

})
export type createTaskSchemaType = z.infer<typeof createTaskSchema>


