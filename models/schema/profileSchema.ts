
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
        .min(0)
        .refine((val) => val === '' || /^\+\d{12}$/.test(val), { // Remove regex if field is empty
            message: "Valid phone format: +380123456789"
        })
        .optional(),  
    company: z
        .string()
        // .min(0)
        // .refine((val) => val === '' || /^[a-zA-Z]+$|^[0-9]+$|^[\w\s]+$|^[\w\s_]+$/.test(val), { // Remove regex if field is empty
        //     message: "Letters and numbers only"
        // })
        .optional(),      
    location: z
        .string()
        .min(0)
        .refine((val) => val === '' || /^[a-zA-Z]+$|^[0-9]+$|^[\w\s]+$|^[\w\s_]+$/.test(val), { // Remove regex if field is empty
            message: "Letters and numbers only"
        })
        .optional(),   
    
})

export type createProfileSchemaType = z.infer<typeof createProfileSchema>

