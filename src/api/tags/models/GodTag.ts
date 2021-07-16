import { DocumentType } from "@typegoose/typegoose";
import { TagNotFound } from "../../../errors";
import { TagModel } from "../../../models";
import { GodBook } from "../../books/models/GodBook";
import { SafeUser } from "../../users/models/SafeUser";
import User from "../../users/models/User";
import Book from "../../books/models/Book";

export interface GodTag {
  id: string;
  tag: string;
  books?: GodBook[];
  users?: SafeUser[];
}

export class RealGodTag implements GodTag {
  readonly id: string;
  readonly tag: string;
  books?: GodBook[];
  users?: SafeUser[];

  constructor(id: string, tag: string) {
    this.id = id;
    this.tag = tag;
  }

  public async populate() {
    try {
      const tag = await TagModel.findById(this.id).populate("bookIds").populate("userIds").exec();

      if (!tag) throw new TagNotFound();

      if (tag.bookIds) {
        this.books = [];

        for (const book of tag.bookIds as DocumentType<Book>[]) {
          this.books.push(await book.toGodBook());
        }
      }
      this.users = (tag.userIds as DocumentType<User>[]).map((user: DocumentType<User>) => user.toSafeUser());
    } catch (error) {
      throw error;
    }
  }
}
