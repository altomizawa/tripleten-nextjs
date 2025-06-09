export type Card = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: string[];
  owner: string;
  createdAt?: string;
  updatedAt?: string;
} | undefined


export interface SessionPayload {
  userId: string;
  expiresAt: Date;
}

export interface sanitizedUser {
  id: string;
  name: string;
  email: string;
  avatar: string
  profession: string;
}

export type FormState = {
  status: number;
  success: boolean;
  message: string;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  } | null;
}

export type CardResponse = {
  status: number;
  success: boolean;
  message: string;
}