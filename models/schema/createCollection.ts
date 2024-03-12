import { CollectionColors } from '@/lib/constants'
import {z} from 'zod'
export const createCollectionSchema = z.object({
    name: z
    .string()
    .min(4, 'Collection name should be at least 4 characters')
    .regex(/^[a-zA-Z0-9]+$/, { 
        message: "Use letters and numbers only" 
    }),      
    color: z
    .string()
    .refine(color => Object.keys(CollectionColors).includes(color))
})

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>

