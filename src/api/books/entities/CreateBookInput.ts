export interface CreateBookInput {
  googleId: string;
  title: string;
  coverImage?: string;
  author: string;
  tags: string[];
  userAddedBy: string;
}
