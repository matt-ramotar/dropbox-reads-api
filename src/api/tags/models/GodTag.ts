import { DocumentType } from "@typegoose/typegoose";
import { TagNotFound } from "../../../errors";
import { TagModel } from "../../../models";
import Book from "../../books/models/Book";
import { SafeUser } from "../../users/models/SafeUser";
import User from "../../users/models/User";

export interface GodTag {
  id: string;
  tag: string;
  books?: Book[];
  users?: SafeUser[];
}

export class RealGodTag implements GodTag {
  readonly id: string;
  readonly tag: string;
  books?: Book[];
  users?: SafeUser[];

  constructor(id: string, tag: string) {
    this.id = id;
    this.tag = tag;
  }

  public async populate() {
    try {
      const tag = await TagModel.findById(this.id).populate("bookIds").populate("userIds").exec();

      if (!tag) throw new TagNotFound();

      this.books = tag.bookIds as DocumentType<Book>[];
      this.users = (tag.userIds as DocumentType<User>[]).map((user: DocumentType<User>) => user.toSafeUser());
    } catch (error) {
      throw error;
    }
  }
}
