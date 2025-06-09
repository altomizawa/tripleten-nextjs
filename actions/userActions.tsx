'use server'
import { verifySession } from "@/lib/dal";
import { UpdateUserFormSchema } from "@/lib/definitions";
import { User } from "@/models/User";
import connectDB from "@/lib/database";
import { revalidatePath } from "next/cache";

const getUserfromSession = async () => {
  const session = await verifySession();
  if (!session) {
    return {
      status: 401,
      success: false,
      message: "Unauthorized",
    };
  }
  const user = await User.findById(session.userId);
  if (!user) {
    return {
      status: 404,
      success: false,
      message: "User not found",
    };
  }
  const sanitizedUser =  {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    profession: user.profession,
  };
  return {
    status: 200,
    success: true,
    user: JSON.parse(JSON.stringify(sanitizedUser)),
  };
}

const updateUser = async (formData: FormData) => {
  const session = await verifySession();
  const { userId } = session;
  try {
    await connectDB()
    const user = await User.findById(userId);
    // Validate form fields
    const validatedFields = UpdateUserFormSchema.safeParse({
      name: formData.get('name') || user.name, // Use existing name if not provided
      email: formData.get('email') || user.email, // Use existing email if not provided
      avatar: formData.get('avatar') || user.avatar, // Use existing avatar if not provided
      profession: formData.get('profession') || user.profession, // Use existing avatar if not provided
    })
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      console.log('Validation errors:', validatedFields.error.flatten().fieldErrors);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }
    // If all form fields are valid, prepare data for insertion into the database
    const { name, email, avatar, profession  } = validatedFields.data
    user.name = name; // Use existing name if not provided
    user.email = email; // Use existing email if not provided
    user.avatar = avatar; // Use existing avatar if not provided
    user.profession = profession; // Use existing avatar if not provided
    await user.save();
    revalidatePath('/');
    return {
      status: 200,
      success: true,
      message: 'User updated successfully',
    }
  } catch (error) {
    console.log(error)
  }
  return{
    status: 200,
    success: true,
    message: 'User updated successfully',
  }
}


export { getUserfromSession, updateUser};