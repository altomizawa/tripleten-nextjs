export interface Card {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  likes: number;
  createdAt?: string;
  updatedAt?: string;
}

