"use client"

import Link from "next/link"


function LoginForm() {
  return (
    <div className="grid place-items-center h-screen ">
      <div className="flex flex-col gap-3 w-[380px] bg-slate-50 p-8 rounded-lg shadow-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold">LogIn</h1>
        <form className="grid grid-rows-4 gap-4 h-[200px]">
            <input 
            type="text"
            placeholder="Email" 
            className="authinput"/>
            <input 
            type="text"
            placeholder="Password"  
            className="authinput"/>
            <button type="submit" className="authbtn">LogIn</button>
            <div className="autherror">
                error message
            </div>
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
