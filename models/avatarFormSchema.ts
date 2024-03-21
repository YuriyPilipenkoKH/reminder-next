
import {z} from 'zod'
export const avatarFormSchema = z.object({
    avatarURL: z
        .string()
        .min(1), // Marking the field as required

})
export type avatarFormSchemaType = z.infer<typeof avatarFormSchema>

