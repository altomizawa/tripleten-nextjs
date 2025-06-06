'use server'
import connectDB from "@/lib/database";
import Card from "@/models/Card";

const addCard = async (formData: FormData) => {
  const title =  formData.get("title") as string; 
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  if (!title || !description || !imageUrl) {
    console.error("Missing required fields");
    return { status: 400, success: false, message: "Missing required fields" };
  }

  try{
    await connectDB();
    const card = Card.create({
      title,
      description,
      imageUrl,
      likes: 0,
    });
    if (!card) {
      throw new Error("Failed to create card");
    }
    return { status: 200, success: true, message: "Card created successfully" };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: error };
  }
}

export { addCard };