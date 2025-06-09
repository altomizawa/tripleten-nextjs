'use server'
import { verifySession } from "@/lib/dal";
import { User } from "@/models/User";

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
  };
  return {
    status: 200,
    success: true,
    user: JSON.parse(JSON.stringify(sanitizedUser)),
  };
}

export { getUserfromSession };