"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { FormInput, RegisterSchema } from "../models/auth"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { connectMongoDB } from "@/lib/mongoDB";
import { registerUser } from "@/lib/registerUser";
// import dotenv from 'dotenv'
// dotenv.config()
// const { API_PORT=4040 } = process.env
// console.log(API_PORT)

function RegisterForm() {
  
  const router = useRouter();
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
} = formState

const onSubmit = async(data:{
  name:string, 
  email:string, 
  password:string 
}) => {
  console.log('Form submited',data)
  const {name, email, password } = data

  try {
    const res = await fetch("http://localhost:4040/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
 
    if (res.ok) {
      console.log("Sucsessfull registration.");
      reset()
      router.push("/");
    } else {
      console.log("User registration failed.");
    }
  } catch (error) {
    console.log("Error during registration: ", error);
  }
};

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
            placeholder="Name" 
            className="authinput"/>
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
            className="authbtn">Register</button>
            {(errors?.name || errors?.email || errors?.password )&& (
              <div className="autherror">
                {errors.name && <div>{errors.name.message}</div>}
                {!errors.name && errors.email && <div>{errors.email.message}</div>}
                {!errors.name && !errors.email && errors.password && <div>{errors.password.message}</div>}
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
