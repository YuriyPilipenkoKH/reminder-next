"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { FormInput, RegisterSchema } from "../models/auth"
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";


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
    isLoading,
    isSubmitting
} = formState




const onSubmit = async(data:{
  name:string, 
  email:string, 
  password:string 
}) => {
  // console.log('Form submited',data)
  // const {name, email, password } = data

  try {
   const response = await axios.post("/api/users/register", data)
   toast.success('Signnup success')
   reset()
   console.log("Signnup success", response.data)
   router.push("/login")
  }
   catch (error:any) {
    console.log("Signup failed",error)
    toast.error(error.message)
  }
  // try-catch working with backend
  // try {
  //   const res = await fetch( `${process.env.NEXT_PUBLIC_API_PORT}api/auth/register`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       password,
  //     }),
  //   });
 
  //   if (res.ok) {
  //     console.log("Sucsessfull registration.");
  //     reset()
  //     router.push("/dashboard")
  //   } else {
  //     console.log("User registration failed.");
  //   }
  // } catch (error) {
  //   console.log("Error during registration: ", error);
  // }

};

  return (
    <div className="pageWrapper">
      <div className="formWrapper">
        <h1 className="text-xl font-bold">
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
        <input 
            {...register('password')}
            placeholder="Password"  
            className="authinput"/>
        <button 
            type="submit" 
            disabled={isSubmitting || !isDirty || !isValid}
            className="authbtn">
             {isValid ? "Register" : "No SignUp"}
        </button>
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
