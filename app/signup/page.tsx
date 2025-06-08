'use client'
import { useState, useActionState } from "react"
import { signup } from "@/lib/auth"


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [state, formAction] = useActionState(signup, undefined)

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <form action={formAction} className="bg-white flex flex-col w-[90%] lg:w-2/3 max-w-[400] justify-center gap-4 px-12 py-8 text-black placeholder:text-black relative allpopups">
        <h2 className='text-xl font-bold text-center mb-12'>SIGN UP</h2>
        <input name='name' type="text" placeholder="name" required />
        <input name='email' type="email" placeholder="email" required/>
        <input name='password' type={showPassword ? 'text' : 'password'} placeholder='password' minLength={4} maxLength={16}required />
        <input name='confirmPassword' type={showPassword ? 'text' : 'password'} placeholder="confirm password" minLength={4} maxLength={16} required/>
        <button type='button' onClick={togglePasswordVisibility} className="relative cursor-pointer text-right text-sm underline">
           {showPassword ? 'Hide password' : 'Show password'} 
        </button>
        <button className='bg-black hover:bg-black/80 cursor-pointer text-white font-bold py-2 px-4 rounded mt-8' type="submit">Submit</button>
      </form>

    </div>
  )
}

export default Signup


  