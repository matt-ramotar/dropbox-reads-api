export interface CreateBookInput {
  googleId: string;
  title: string;
  description: string,
  coverImage?: string;
  authorId: string;
  tagIds: string[];
  userId: string;
}
