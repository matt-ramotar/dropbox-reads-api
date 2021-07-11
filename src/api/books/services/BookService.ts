import { DocumentType } from "@typegoose/typegoose";
import Book from "../models/Book";
import { GodBook } from "../models/GodBook";
import addBookshelf from "./addBookshelf";
import addBookTag from "./addBookTag";
import addReview from "./addReview";
import createBook from "./createBook";
import getGodBookById from "./getGodBookById";

interface BookService {
  createBook(googleId: string, title: string, authorId: string, userId: string, coverImage?: string): Promise<DocumentType<Book>>;
  addBookshelf(bookId: string, bookshelfId: string): Promise<void>;
  addBookTag(bookId: string, bookTagId: string): Promise<void>;
  addReview(bookId: string, reviewId: string): Promise<void>;
  getGodBookById(bookId: string): Promise<GodBook>;
}

export default class RealBookService implements BookService {
  public async createBook(
    googleId: string,
    title: string,
    authorId: string,
    userId: string,
    coverImage?: string
  ): Promise<DocumentType<Book>> {
    return await createBook(googleId, title, authorId, userId, coverImage);
  }

  public async addBookshelf(bookId: string, bookshelfId: string): Promise<void> {
    return await addBookshelf(bookId, bookshelfId);
  }

  public async addBookTag(bookId: string, bookTagId: string): Promise<void> {
    return await addBookTag(bookId, bookTagId);
  }

  public async addReview(bookId: string, reviewId: string): Promise<void> {
    return await addReview(bookId, reviewId);
  }

  public async getGodBookById(bookId: string): Promise<GodBook> {
    return await getGodBookById(bookId);
  }
}
