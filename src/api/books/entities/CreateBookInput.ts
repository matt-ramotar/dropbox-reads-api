export interface CreateBookInput {
  googleId: string;
  title: string;
  coverImage?: string;
  authorId: string;
  tagIds: string[];
  userId: string;
}
