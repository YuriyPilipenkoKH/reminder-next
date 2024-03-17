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
    birthday: z
        .string()
        .regex( /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, { 
            message: "Valid date format: DD-MM-YYYY " 
        })
        .optional(), 
    phone: z
        .string()
        .regex(/^\+\d{12}$/, { 
            message: "Valid phone format: +380123456789" 
        })
        .optional(),  
    location: z
        .string()
        .regex(/^[A-Za-z\s]+$/, { 
            message: "he string may contain only letters and numbers" 
        })
        .optional(),  
 
})

export type createProfileSchemaType = z.infer<typeof createProfileSchema>

