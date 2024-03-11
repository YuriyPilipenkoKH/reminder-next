"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { LogInput, LoginSchema } from "../models/auth"
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext, useState } from "react";
import UserContext, { UserContextType } from "@/context/UserContext";

function LoginForm() {
    const [logError, setLogError] = useState('')
    const router = useRouter();
    const { setUser } = useContext(UserContext as React.Context<UserContextType>);

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
        isSubmitting,
        isLoading
    } = formState
    
    const onSubmit =async (data:{
        email:string, 
        password:string 
    }) => {


    try {
        const response = await axios.post("/api/users/login", data)
        toast.success('Login success')
        reset()
        console.log("Login success", response.data)
        setUser(data)
         router.push('/dashboard')
         
    } 
    catch (error:any) {
        console.log("Login failed",error)
        setLogError(error.message)
        toast.error(error.message)
        
    }



    };
    
  return (
    <div className="pageWrapper">
      <div className="formWrapper">
        <h1 className="text-xl font-bold">
        {(isLoading || isSubmitting) ? "Processing" : "LogIn"} </h1>
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
            className="authbtn">
                LogIn
        </button>
            {( errors?.email || errors?.password )&& (
              <div className="autherror">
                {errors.email && <div>{errors.email.message}</div>}
                {!errors.email && errors.password && <div>{errors.password.message}</div>}
              </div>
            )}
            {logError && <div className="autherror">{"Incorrect login or password"}</div>}
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
