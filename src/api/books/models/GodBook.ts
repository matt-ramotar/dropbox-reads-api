import { AuthorNotFound, BookshelfNotFound, BookTagNotFound, BookUpvoteNotFound, CommentNotFound, ReviewNotFound, UserNotFound } from "../../../errors";
import { AuthorModel, BookshelfModel, BookTagModel, BookUpvoteModel, CommentModel, ReviewModel, UserModel } from "../../../models";
import Author from "../../authors/models/Author";
import Bookshelf from "../../bookshelves/models/Bookshelf";
import BookUpvote from "../../bookupvotes/models/BookUpvote";
import BookTag from "../../booktags/models/BookTag";
import Comment from "../../comments/models/Comment";
import Review from "../../reviews/models/Review";
import { SafeUser } from "../../users/models/SafeUser";
import { Refs } from "../entities/Refs";

export interface GodBook {
  id: string;
  googleId?: string;
  title: string;
  coverImage?: string;
  author?: Author;
  bookTags?: BookTag[];
  userAddedBy: SafeUser;
  bookshelves?: Bookshelf[];
  reviews?: Review[];
  bookUpvotes?: BookUpvote[];
  bookComments?: Comment[];
}

export class RealGodBook implements GodBook {
  readonly id: string;
  readonly googleId?: string;
  readonly title: string;
  readonly coverImage?: string;
  author?: Author;
  bookTags?: BookTag[];
  userAddedBy!: SafeUser;
  bookshelves?: Bookshelf[];
  reviews?: Review[];
  bookUpvotes?: BookUpvote[];
  bookComments?: Comment[];

  constructor(id: string, title: string, googleId?: string, coverImage?: string) {
    this.id = id;
    this.title = title;
    this.googleId = googleId;
    this.coverImage = coverImage;
  }

  public async populate(refs: Refs) {
    const { authorId, bookTagIds, userAddedById, bookshelfIds, reviewIds, bookUpvoteIds, bookCommentIds } = refs;

    if (authorId) await this.setAuthor(authorId);
    if (bookTagIds) await this.setBookTags(bookTagIds);
    if (userAddedById) await this.setUserAddedBy(userAddedById);
    if (bookshelfIds) await this.setBookshelves(bookshelfIds);
    if (reviewIds) await this.setReviews(reviewIds);
    if (bookUpvoteIds) await this.setBookUpvotes(bookUpvoteIds);
    if (bookCommentIds) await this.setBookComments(bookCommentIds);
  }

  private async setAuthor(id: string): Promise<void> {
    try {
      const author = await AuthorModel.findById(id);
      if (!author) throw new AuthorNotFound();
      else this.author = author;
    } catch (error) {
      throw error;
    }
  }

  private async setBookTags(ids: string[]): Promise<void> {
    try {
      const bookTags = [];
      for (const id of ids) {
        const bookTag = await BookTagModel.findById(id);
        if (!bookTag) throw new BookTagNotFound();
        bookTags.push(bookTag);
      }
      this.bookTags = bookTags;
    } catch (error) {
      throw error;
    }
  }

  private async setUserAddedBy(id: string): Promise<void> {
    try {
      const user = await UserModel.findById(id);
      if (!user) throw new UserNotFound();
      else this.userAddedBy = user.toSafeUser();
    } catch (error) {
      throw error;
    }
  }

  private async setBookshelves(ids: string[]): Promise<void> {
    try {
      const bookshelves = [];
      for (const id of ids) {
        const bookshelf = await BookshelfModel.findById(id);
        if (!bookshelf) throw new BookshelfNotFound();
        bookshelves.push(bookshelf);
      }
      this.bookshelves = bookshelves;
    } catch (error) {
      throw error;
    }
  }

  private async setReviews(ids: string[]): Promise<void> {
    try {
      const reviews = [];
      for (const id of ids) {
        const review = await ReviewModel.findById(id);
        if (!review) throw new ReviewNotFound();
        reviews.push(review);
      }
      this.reviews = reviews;
    } catch (error) {
      throw error;
    }
  }

  private async setBookUpvotes(ids: string[]): Promise<void> {
    try {
      const upvotes = [];
      for (const id of ids) {
        const upvote = await BookUpvoteModel.findById(id);
        if (!upvote) throw new BookUpvoteNotFound();
        upvotes.push(upvote);
      }
      this.bookUpvotes = upvotes;
    } catch (error) {
      throw error;
    }
  }

  private async setBookComments(ids: string[]): Promise<void> {
    try {
      const comments = [];
      for (const id of ids) {
        const comment = await CommentModel.findById(id);
        if (!comment) throw new CommentNotFound();
        comments.push(comment);
      }
      this.bookComments = comments;
    } catch (error) {
      throw error;
    }
  }
}
