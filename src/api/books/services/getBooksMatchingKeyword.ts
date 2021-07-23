import { DocumentType } from "@typegoose/typegoose";
import { caseInsensitiveIsIn } from "../../../helpers/isIn";
import { AuthorModel, BookModel, BookTagModel, TagModel } from "../../../models";
import Book from "../../books/models/Book";
import { GodBook } from "../../books/models/GodBook";

export default async function getBooksMatchingKeyword(keyword?: string, title?: string, author?: string, tags?: string[]): Promise<GodBook[]> {
  let matchingBooks: DocumentType<Book>[] = [];

  if (keyword) {
    // Search in book title, book author, and book tag fields
    title = keyword;
    author = keyword;
    tags = [keyword];
  }

  if (title) {
    matchingBooks = await BookModel.find({ title: { $regex: title, $options: "i" } });
  }

  const allBooks = await BookModel.find();
  if (author) {
    for (const book of allBooks) {
      const bookAuthor = await AuthorModel.findById(book.authorIds[0]);
      if (bookAuthor) {
        const fullName = bookAuthor.firstName + " " + bookAuthor.lastName;
        const authorReg = new RegExp(author, "i");
        if (fullName.search(authorReg) != -1) {
          matchingBooks.push(book);
        }
      }
    }
  }

  if (tags) {
    // A search result must contain all the tags present
    for (const book of allBooks) {
      if (book.bookTagIds) {
        const bookTags: string[] = [];
        for (const btId of book.bookTagIds) {
          const bookTag = await BookTagModel.findById(btId);

          if (bookTag && bookTag.tagId) {
            const tag = await TagModel.findById(bookTag.tagId);
            if (tag && tag.tag) bookTags.push(tag.tag);
          }
        }

        if (tags.every((t) => caseInsensitiveIsIn(t, bookTags))) {
          matchingBooks.push(book);
        }
      }
    }
  }

  if (!keyword && !title && !author && !tags) {
    // All fields are empty, return all book entries
    matchingBooks = allBooks;
  }

  const books = [];
  if (matchingBooks) {
    for (const title of matchingBooks) {
      books.push(await title.toGodBook());
    }
  }

  return books;
}
