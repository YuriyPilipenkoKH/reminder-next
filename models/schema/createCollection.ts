import { CollectionColors } from '@/lib/constants'
import {z} from 'zod'
export const createCollectionSchema = z.object({
    name: z
    .string()
    .min(3, 'Name should be at least 3 characters long')
    .regex(/^[a-zA-Z]+$|^[0-9]+$|^[\w\s]+$|^[\w\s_]+$/, { 
        message: "Use letters and numbers only" 
    }),      
    color: z
    .string()
    // .refine(color => Object.keys(CollectionColors).includes(color))
})

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>

