import { z } from "zod";


export const moveTaskSchema = z.object({

    collection: z
    .string()



})
export type moveTaskSchemaType = z.infer<typeof moveTaskSchema>


