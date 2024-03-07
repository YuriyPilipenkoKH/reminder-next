import { z } from "zod"

export const RegisterSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name must be 3 or more characters long')
        .max( 32, 'Name should be shorter than 32 characters')
        .refine((val) => !val.toLowerCase().startsWith('qwe'), {
            message: 'Enter a different name'
          })
        .refine((val) => val.toLowerCase() !== 'admin', {
            message: 'Admin is not allowed'
          })  
          ,

    email: z
        .string()
        .email('email is not valid')
        .refine((val) => !val.toLowerCase().startsWith('admin'), {
            message: 'Enter a different email address'
          })  
        .refine((val) => !val.endsWith('.ru'), {
            message: 'Domain is not supported'
          })
        // .refine(async (fieldValue) => {
        //     const result = await emailAvailable(fieldValue);
        //     return result === undefined;
        // }, {
        //     message: 'Enter a different email address'
        // })  
        ,
    password: z
        .string()
        .min(6, "Minimum 6 characters for password")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$#&]*$/, { 
            message: "Include capital letters and numbers" 
        }),      
})

   export type FormInput = z.infer <typeof RegisterSchema >
