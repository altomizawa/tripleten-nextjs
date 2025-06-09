'use client'
import { useState, useActionState, useEffect } from "react"
import { login } from "@/lib/auth"
import Link from "next/link"
import { Toaster, toast } from "sonner"


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction, isPending] = useActionState(login, null);


  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  useEffect(() => {
  if (state) {
    toast.error(state?.message || 'An error occurred');
  }
  }, [state]);



  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <Toaster richColors position="top-center" />
      <form action={formAction} className="bg-white flex flex-col w-[90%] lg:w-2/3 md:max-w-[600] justify-center gap-4 px-12 py-8 text-black placeholder:text-black relative allpopups">
        <h2 className='text-xl font-bold text-center mb-12'>LOGIN</h2>
        <input name='email' type="email" placeholder="email" required />
        <p className='input-error'>{state?.errors?.email}</p>
        <input name='password' type={showPassword ? 'text' : 'password'} placeholder='password' required />
        <p className='input-error'>{state?.errors?.password}</p>
        <div className="flex justify-end -mt-2">
          <button className="relative cursor-pointer text-right text-sm underline" type='button' onClick={togglePasswordVisibility} >
           {showPassword ? 'Hide password' : 'Show password'} 
          </button>
        </div>
        <button className='cursor-pointer text-white font-bold py-2 px-4 rounded mt-8 bg-black hover:bg-black/80' type="submit">{isPending ? 'Loading...' : 'Submit'}</button>
      <p className="text-center text-sm text-gray-600">Don&apos;t have an account? <Link href='/signup' className="underline hover:text-black text-right w-full">Click here</Link></p>
      </form>
    </div>
  )
}

export default Login


  