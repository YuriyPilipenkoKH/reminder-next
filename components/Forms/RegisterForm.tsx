"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { FormInput, RegisterSchema } from "../../models/auth"
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import BoolIcon from "../icons/BoolIcon";
import { wait } from "@/lib/wait";


function RegisterForm() {
  const [regError, setRegError] = useState('')
  const [show, setShow] = useState(true)
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
    isLoading,
    isSubmitting
} = formState




const onSubmit = async(data:{
  name:string, 
  email:string, 
  password:string 
}) => {


  try {
   const response = await axios.post("/api/users/register", data)
   toast.success('Registration successfull')
   await wait(1000)
   toast.success('Congratulstions!')
   reset()
   console.log("Signnup success", response.data)
   router.push("/login")
  }
   catch (error:any) {
    console.log("Signup failed",error)
    setRegError(error?.response.data.error)
    toast.error(error?.response.data.error)
  }


};

  return (
    <div className="pageWrapper">
      <div className="formWrapper">
        <h1 className="text-xl font-bold log_title">
         {(isLoading || isSubmitting) ? "Processing" : "Register"} </h1>
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
        <label className="relative">
            <input
                {...register('password')}
                placeholder="Password"
                type={show ? "text" : "password"}
                className="authinput"/>
                <button 
                type='button'
                onClick={() => setShow((prev) => !prev)}
                className="absolute top-3 right-4">
                    < BoolIcon /></button>
        </label>
        <button 
            type="submit" 
            disabled={isSubmitting || !isDirty || !isValid}
            className="authbtn">
             {isValid ? "Register" : "Fill the Form"}
        </button>
            {(errors?.name || errors?.email || errors?.password )&& (
              <div className="autherror">
                {errors.name && <div>{errors.name.message}</div>}
                {!errors.name && errors.email && <div>{errors.email.message}</div>}
                {!errors.name && !errors.email && errors.password && <div>{errors.password.message}</div>}
              </div>
            )}
            {regError && <div className="autherror">{regError}</div>}
        </form>
            <p className="text-sm flex gap-2 justify-end log_link">Already have an account? 
            <Link
            className="text-bold text-blue-900 log_link"
             href={'/login'}>Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterForm
