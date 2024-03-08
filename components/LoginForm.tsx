"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { LogInput, LoginSchema } from "../models/auth"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from "react";

function LoginForm() {
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
        isSubmitSuccessful,
    } = formState
    
    const onSubmit = (data:{}) => {
      console.log('Form submited',data)
      
    };
    
    useEffect(() => {
        if(isSubmitSuccessful) {
            reset()
        }
      }, [isSubmitSuccessful, reset])

  return (
    <div className="grid place-items-center h-screen ">
      <div className="flex flex-col gap-3 w-[380px] bg-slate-50 p-8 rounded-lg shadow-lg border-t-4 border-green-400">
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
            disabled={!isDirty || !isValid}
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
