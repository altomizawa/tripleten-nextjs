import { Schema, model, models } from 'mongoose';

const userSchema = new Schema( {
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  avatar: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 50,
  }
})

export const User = models.User || model('User', userSchema);