export interface CreateBookInput {
  googleId: string;
  title: string;
  description: string;
  coverImage?: string;
  authorIds: string[];
  tagIds: string[];
  userId: string;
}
