'use server'
import connectDB from "@/lib/database";
import Card from "@/models/Card";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";

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
    const { userId } = await verifySession();
    const card = await Card.create({
      title,
      description,
      imageUrl,
      owner: userId.toString(),
    });
    if (!card) {
      throw new Error("Failed to create card");
    }
    revalidatePath("/");
    return { status: 200, success: true, message: "Card created successfully" };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: error };
  }
}

const getCards = async () => {
  try{
    await connectDB();
    await verifySession();

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
    await verifySession();
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

const handleLikes = async (cardId: string, userId: string) => {
  try{
    await connectDB();
    debugger
    await verifySession();
    const card = await Card.findById(cardId);
    if (!card) {
      throw new Error("Failed to find card");
    }
    if (card.likes.includes(userId)){
      await card.removeLike(userId);
      await card.save();
      revalidatePath("/");
      return { status: 200, success: true, message: "Like removed successfully" };
    }
    await card.addLike(userId);
    await card.save();
    revalidatePath("/");
    return { status: 200, success: true, message: "Like added successfully" };
  } catch (error) {
    console.error(error);
    return { status: 500, success: false, message: error };
  }
}


export { addCard, getCards, deleteCard, handleLikes };