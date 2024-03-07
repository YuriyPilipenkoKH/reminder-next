"use client"

import Link from "next/link"


function RegisterForm() {
  return (
    <div className="grid place-items-center h-screen ">
      <div className="flex flex-col gap-3 w-[380px] bg-slate-50 p-8 rounded-lg shadow-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold">Register</h1>
        <form className="grid grid-rows-5 gap-4 h-[250px]">
        <input 
            type="text"
            placeholder="Name" 
            className="authinput"/>
        <input 
            type="text"
            placeholder="Email" 
            className="authinput"/>
        <input 
            type="text"
            placeholder="Password"  
            className="authinput"/>
            <button type="submit" className="authbtn">Register</button>
            <div className="autherror">
                error message
            </div>
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
