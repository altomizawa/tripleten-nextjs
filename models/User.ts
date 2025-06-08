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
  },
  avatar: {
    type: String,
    default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F313107%2Favatar-default&psig=AOvVaw17rQ1OdVb8uQuXeoBt1Uhg&ust=1749504862837000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDIm87j4o0DFQAAAAAdAAAAABAE',
    required: false,
    minLength: 2,
  }
})

export const User = models.User || model('User', userSchema);