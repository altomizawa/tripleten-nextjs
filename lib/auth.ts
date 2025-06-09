'use server'
import { SignupFormSchema, LoginFormSchema, FormState } from "./definitions"
import { redirect } from "next/navigation"
import bcrypt from 'bcrypt'
import connectDB from "@/lib/database"
import { User } from "@/models/User"
import  { createSession, deleteSession } from "@/lib/session"


const signup = async ( currentState: FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  // If all form fields are valid, prepare data for insertion into the database
  const { name, email, password  } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 12)
  

    await connectDB();
    const currentUser = await User.findOne({ email })
    if (currentUser) {
      return {
        status: 400,
        success: false,
        message: 'User already exists'
      }
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    if (!user) {
      return {
        status: 500,
        success: false,
        message: 'Error creating user'
      }
    }
    await createSession(user._id.toString())
    redirect('/')
}

const login = async ( currentState: FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      status: 400,
      success: false,
      message: 'Invalid form data',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  // If all form fields are valid, prepare data for insertion into the database
  const { email, password  } = validatedFields.data
  
    await connectDB();
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      return {
        status: 400,
        success: false,
        message: 'Invalid username or password'
      }
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordValid) {
      return {
        status: 400,
        success: false,
        message: 'Invalid username or password'
      }
    }
    await createSession(existingUser._id.toString())
    redirect('/')
}


// const login = async (
//   state: FormState | null, // Changed from currentState: FormState
//   formData: FormData
// ) => {
//   // Validate form fields
//   const validatedFields = LoginFormSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });
 
//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     console.log(validatedFields.error.flatten().fieldErrors);
//     return {
//       status: 400,
//       success: false,
//       message: 'Invalid form data',
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }
//   // If all form fields are valid, prepare data for insertion into the database
//   const { email, password } = validatedFields.data;
  
//   try {
//     await connectDB();
//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       return {
//         status: 400,
//         success: false,
//         message: 'Invalid username or password'
//       };
//     }

//     const isPasswordValid = await bcrypt.compare(password, existingUser.password);
//     if (!isPasswordValid) {
//       return {
//         status: 400,
//         success: false,
//         message: 'Invalid username or password'
//       };
//     }
//     await createSession(existingUser._id.toString());
//     redirect('/');
//     // Since redirect will end execution, add a return for TypeScript
//     return {
//       status: 200,
//       success: true,
//       message: 'Login successful'
//     };
//   } catch (error) {
//     console.error('Login error:', error);
//     return {
//       status: 500,
//       success: false,
//       message: 'An error occurred during login'
//     };
//   }
// };

async function logout () {
  await deleteSession();
  redirect('/login');
}

export { signup, logout, login }