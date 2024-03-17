import { CollectionColors } from '@/lib/constants'
import {z} from 'zod'
export const createProfileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'At least 3 characters for name')
        .max( 32, 'Not longer than 32 characters')
        .refine((val) => !val.toLowerCase().startsWith('qwe'), {
            message: 'Enter a different name'
          })
        .refine((val) => val.toLowerCase() !== 'admin', {
            message: 'Admin is not allowed'
          })  
        .optional(),   
    email: z
        .string()
        .email('Email is not valid')
        .refine((val) => !val.toLowerCase().startsWith('admin'), {
            message: 'Enter a different email address'
          })  
        .refine((val) => !val.endsWith('.ru'), {
            message: 'Domain is not supported'
          })
          .optional(), 
    phone: z
        .string()
        .regex(/^\+\d{12}$/, { 
            message: "Valid phone format: +380123456789" 
        })
        .optional(),  
    company: z
        .string()
        .optional(),      
    location: z
        .string()
        .optional(),   
    
})

export type createProfileSchemaType = z.infer<typeof createProfileSchema>

