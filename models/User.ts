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
  profession: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 50,
    default: 'Full Stack Developer',
  },
  avatar: {
    type: String,
    default: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSkmcbdyf8TzAKqNZimZDd21p4kCX0ASCiKnYOmaicRyrO3Sf68XMCFN8AsPi9F1F9EtfByPLTPGffNcU_VkYFxA',
    required: false,
    minLength: 2,
  }
})

export const User = models.User || model('User', userSchema);