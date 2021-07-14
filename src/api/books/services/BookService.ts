import { DocumentType } from "@typegoose/typegoose";
import Book from "../models/Book";
import { GodBook } from "../models/GodBook";
import addBookshelf from "./addBookshelf";
import addBookTag from "./addBookTag";
import addReview from "./addReview";
import addBookUpvote from "./addBookUpvote";
import createBook from "./createBook";
import getGodBookById from "./getGodBookById";
import addComment from "./addComment";
import getBooksMatchingKeyword from "./getBooksMatchingKeyword";

interface BookService {
  createBook(googleId: string, title: string, authorId: string, userId: string, coverImage?: string): Promise<DocumentType<Book>>;
  addBookshelf(bookId: string, bookshelfId: string): Promise<void>;
  addBookTag(bookId: string, bookTagId: string): Promise<void>;
  addReview(bookId: string, reviewId: string): Promise<void>;
  getGodBookById(bookId: string): Promise<GodBook>;
  addBookUpvote(bookId: string, upvoteId: string): Promise<void>;
  addComment(bookId: string, commentId: string): Promise<void>;
  getBooksMatchingKeyword(keyword: string): Promise<GodBook[]>;
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

  public async addBookUpvote(bookId: string, upvoteId: string): Promise<void> {
    return await addBookUpvote(bookId, upvoteId);
  }

  public async addComment(bookId: string, commentId: string): Promise<void> {
    return await addComment(bookId, commentId);
  }

  public async getBooksMatchingKeyword(keyword: string): Promise<GodBook[]> {
    return await getBooksMatchingKeyword(keyword);
  }
}
