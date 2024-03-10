"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { LogInput, LoginSchema } from "../models/auth"
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginForm() {
    const router = useRouter();
    const {
        register, 
        handleSubmit,
        formState,
        reset,
    } = useForm<LogInput>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode:'all',
        resolver: zodResolver(LoginSchema),
    })
    const {
        errors,
        isDirty,
        isValid ,
        isSubmitting
    } = formState
    
    const onSubmit =async (data:{
        email:string, 
        password:string 
    }) => {
      console.log('Form submited',data)
      const { email, password } = data

      // try-catch failed with backend
    //   try {
    //     const res = await signIn('credentials',{  
    //         email, 
    //         password,
    //         redirect: false
    //      })

    //    reset()
    //    router.push("/dashboard")
   
    // } 
    // catch (error: any) {
    //     if (error) {
    //       switch (error?.type) {
    //         case 'CredentialsSignin':
    //           return 'Invalid credentials.'
    //         default:
    //           return 'Something went wrong.'
    //       }
    //     }
    //     throw error
    //   }

    };
    
  return (
    <div className="pageWrapper">
      <div className="formWrapper">
        <h1 className="text-xl font-bold">LogIn</h1>
        <form 
        onSubmit={handleSubmit(onSubmit)}   
        autoComplete="off"
        noValidate
        className="grid grid-rows-4 gap-4 h-[200px]">
        <input 
            {...register('email')}
            placeholder="Email" 
            className="authinput"/>
        <input 
            {...register('password')}
            placeholder="Password"  
            className="authinput"/>
            <button 
            type="submit" 
            disabled={isSubmitting || !isDirty || !isValid}
            className="authbtn">LogIn</button>
            {( errors?.email || errors?.password )&& (
              <div className="autherror">
                {errors.email && <div>{errors.email.message}</div>}
                {!errors.email && errors.password && <div>{errors.password.message}</div>}
              </div>
            )}
        </form>
            <p className="text-sm flex gap-2 justify-end">Don`t have an account? 
            <Link
            className="text-bold text-blue-900"
             href={'/register'}>Register</Link></p>
      </div>
    </div>
  )
}



export default LoginForm
