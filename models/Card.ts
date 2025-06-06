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
  likes: Number,
})

const Card = models.Card || model('Card', cardSchema)

export default Card;