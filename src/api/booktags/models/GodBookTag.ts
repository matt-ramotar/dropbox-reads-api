import { DocumentType } from "@typegoose/typegoose";
import { BookTagNotFound } from "../../../errors";
import { BookTagModel } from "../../../models";
import Book from "../../books/models/Book";
import BookTagUpvote from "../../booktagupvotes/models/BookTagUpvote";
import Tag from "../../tags/models/Tag";
import { SafeUser } from "../../users/models/SafeUser";

export interface GodBookTag {
  id: string;
  book: Book;
  tag: Tag;
  userAddedBy: SafeUser;
  upvotes?: BookTagUpvote[];
}

export class RealGodBookTag implements GodBookTag {
  readonly id: string;
  book!: Book;
  tag!: Tag;
  userAddedBy!: SafeUser;
  upvotes?: BookTagUpvote[];

  constructor(id: string) {
    this.id = id;
  }

  public async populate() {
    try {
      const bookTag = await BookTagModel.findById(this.id)
        .populate("bookId")
        .populate("tagId")
        .populate("userAddedById")
        .populate("upvoteIds")
        .exec();

      if (!bookTag) throw new BookTagNotFound();
      console.log(bookTag);

      this.book = bookTag.bookId as DocumentType<Book>;
      this.tag = bookTag.tagId as DocumentType<Tag>;
      this.userAddedBy = bookTag.userAddedById as DocumentType<SafeUser>;
      this.upvotes = bookTag.upvoteIds as DocumentType<BookTagUpvote>[];
    } catch (error) {
      throw error;
    }
  }
}
