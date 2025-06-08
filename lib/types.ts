export type Card = {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  likes: string[];
  createdAt?: string;
  updatedAt?: string;
} | undefined

export interface SessionPayload {
  userId: string;
  expiresAt: Date;
}
