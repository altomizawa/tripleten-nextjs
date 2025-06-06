'use server'
import connectDB from "@/lib/database";
import Card from "@/models/Card";
import { revalidatePath } from "next/cache";

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

const getCards = async () => {
  try{
    await connectDB();
    const cards = await Card.find();
    if (!cards) {
      throw new Error("Failed to fetch cards");
    }
    const serializedCards = JSON.parse(JSON.stringify(cards));

    return { status: 200, success: true, serializedCards };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: error }; 
  }
}

const deleteCard = async (id: string) => {
  try{
    await connectDB();
    const card = await Card.findByIdAndDelete(id);
    if (!card) {
      throw new Error("Failed to delete card");
    }
    revalidatePath("/");
    return { status: 200, success: true, message: "Card deleted successfully" };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: error };
  }
}


export { addCard, getCards, deleteCard };