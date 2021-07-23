import axios, { AxiosResponse } from "axios";
import Book from "../../api/books/models/Book";

export async function createBook(
  googleId: string,
  title: string,
  description: string,
  coverImage: string,
  authorId: string,
  tagIds: string[],
  userId: string
): Promise<Book> {
  const url = "https://api.dropboxreads.com/v1/books";
  const response: AxiosResponse = await axios.post(url, {
    googleId,
    title,
    description,
    coverImage,
    authorId,
    tagIds,
    userId
  });
  return response.data;
}
