export interface CreateBookshelfInput {
  name: string;
  description: string;
  ownerId: string;
  tagIds: string[];
}
