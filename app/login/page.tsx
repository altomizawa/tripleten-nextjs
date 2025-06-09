'use client'
import { useState } from "react"
import { login } from "@/lib/auth"
import Link from "next/link"


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const formAction = async (formData: FormData) => {
    const state = await login(formData)
    if(!state?.success) {
      setErrorMessage(state?.message)
    }
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <form action={formAction} className="bg-white flex flex-col w-[90%] lg:w-2/3 md:max-w-[600] justify-center gap-4 px-12 py-8 text-black placeholder:text-black relative allpopups">
        <h2 className='text-xl font-bold text-center mb-12'>LOGIN</h2>
        <input name='email' type="email" placeholder="email" required/>
        {/* <p className='input-error'>{state?.errors.email}</p> */}
        <input name='password' type={showPassword ? 'text' : 'password'} placeholder='password' minLength={4} maxLength={16}required />
        <button type='button' onClick={togglePasswordVisibility} className="relative cursor-pointer text-right text-sm underline">
           {showPassword ? 'Hide password' : 'Show password'} 
        </button>
        <button className='bg-black hover:bg-black/80 cursor-pointer text-white font-bold py-2 px-4 rounded mt-8' type="submit">Submit</button>
      <p className='input-error text-center'>{errorMessage}</p>
      <p className="text-center text-sm text-gray-600">Don't have an account? <Link href='/signup' className="underline hover:text-black text-right w-full">Click here</Link></p>
      </form>
    </div>
  )
}

export default Login


  