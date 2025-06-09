import { Schema, model, models } from 'mongoose';

const cardSchema = new Schema({
  title: {
    type: String,
    required: true
  },  
  description:  {
    type: String,
    required: true
  },  
  imageUrl:  {
    type: String,
    required: true
  },  
  likes: [String],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

cardSchema.methods.addLike = async function(userId: string) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
    await this.save();
  }
}

cardSchema.methods.removeLike = async function(userId: string) {
  if (this.likes.includes(userId)){
    this.likes = this.likes.filter((id: string) => id !== userId);
    await this.save();
  }
}

const Card = models.Card || model('Card', cardSchema)

export default Card;