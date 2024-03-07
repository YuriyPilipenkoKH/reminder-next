"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { FormInput, RegisterSchema } from "../models/auth"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from "react";


function RegisterForm() {

  const {
    register, 
    handleSubmit,
    formState,
    reset,
} = useForm<FormInput>({
    defaultValues: {
        name: '',
        email: '',
        password: ''
    },
    mode:'all',
    resolver: zodResolver(RegisterSchema),
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
        <h1 className="text-xl font-bold">Register</h1>
        <form
        onSubmit={handleSubmit(onSubmit)}   
        autoComplete="off"
        noValidate
         className="grid grid-rows-5 gap-4 h-[250px]">
        <input 
             {...register('name')}
            //  errors={errors?.name as boolean | undefined} 
            placeholder="Name" 
            className="authinput"/>
        <input 
            {...register('email')}
            // errors={errors?.email as boolean | undefined}
            placeholder="Email" 
            className="authinput"/>
        <input 
            {...register('password')}
            // errors={errors?.password as boolean | undefined} 
            placeholder="Password"  
            className="authinput"/>
            <button 
            type="submit" 
            disabled={!isDirty || !isValid}
            className="authbtn">Register</button>
            {(errors?.name || errors?.email || errors?.password )&& (
              <div className="autherror">
               {errors.name && <div>{errors.name.message}</div>}
               {errors.email && <div>{errors.email.message}</div>}
               {errors.password && <div>{errors.password.message}</div>}
              </div>
            )}
        </form>
            <p className="text-sm flex gap-2 justify-end">Already have an account? 
            <Link
            className="text-bold text-blue-900"
             href={'/login'}>Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterForm
