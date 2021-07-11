import { DocumentType } from "@typegoose/typegoose";
import { BookshelfNotFound } from "../../../errors";
import { BookshelfModel } from "../../../models";
import Book from "../../books/models/Book";
import Tag from "../../tags/models/Tag";
import { SafeUser } from "../../users/models/SafeUser";
import User from "../../users/models/User";

export interface GodBookshelf {
  id: string;
  name: string;
  description: string;
  books?: Book[];
  user: SafeUser;
  tags?: Tag[];
}

export class RealGodBookshelf implements GodBookshelf {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  books?: Book[];
  user!: SafeUser;
  tags?: Tag[];

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  public async populate() {
    try {
      const bookshelf = await BookshelfModel.findById(this.id).populate("bookIds").populate("userId").populate("tagIds").exec();

      if (!bookshelf) throw new BookshelfNotFound();

      this.books = bookshelf.bookIds as DocumentType<Book>[];
      this.user = (bookshelf.userId as DocumentType<User>).toSafeUser();
      this.tags = bookshelf.tagIds as DocumentType<Tag>[];
    } catch (error) {
      throw error;
    }
  }
}
