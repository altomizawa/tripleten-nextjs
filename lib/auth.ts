'use server'
import { SignupFormSchema } from "./definitions"

const signup = async (state: FormState, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  console.log(validatedFields.data)
}

export { signup } 