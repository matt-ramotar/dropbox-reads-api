import Book from "../models/Book";
import { GodBook } from "../models/GodBook";
import addBookshelf from "./addBookshelf";
import addBookTag from "./addBookTag";
import addBookUpvote from "./addBookUpvote";
import addComment from "./addComment";
import addReview from "./addReview";
import createBook from "./createBook";
import getBooks from "./getBooks";
import getBooksMatchingKeyword from "./getBooksMatchingKeyword";
import getGodBookById from "./getGodBookById";

interface BookService {
  createBook(googleId: string, title: string, authorId: string, userId: string, coverImage?: string): Promise<Book>;
  addBookshelf(bookId: string, bookshelfId: string): Promise<void>;
  addBookTag(bookId: string, bookTagId: string): Promise<void>;
  addReview(bookId: string, reviewId: string): Promise<void>;
  getGodBookById(bookId: string): Promise<GodBook>;
  addBookUpvote(bookId: string, upvoteId: string): Promise<void>;
  addComment(bookId: string, commentId: string): Promise<void>;
  getBooks(): Promise<GodBook[]>;
  getBooksMatchingKeyword(keyword?: string, title?: string, author?: string, tags?: string[]): Promise<GodBook[]>;
}

export default class RealBookService implements BookService {

  public async createBook(
    googleId: string,
    title: string,
    description: string,
    authorId: string,
    userId: string,
    coverImage?: string
  ): Promise<Book> {
    return await createBook(googleId, title, description, authorId, userId, coverImage);
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

  public async getBooks(): Promise<GodBook[]> {
    return await getBooks();
  }

  public async getBooksMatchingKeyword(keyword?: string, title?: string, author?: string, tags?: string[]): Promise<GodBook[]> {
    return await getBooksMatchingKeyword(keyword, title, author, tags);
  }
}
