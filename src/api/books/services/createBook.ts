import { AuthorModel, BookModel, UserModel } from "../../../models";
import { CreateBookInput } from "../entities/CreateBookInput";
import Book from "../models/Book";

export default async function createBook(input: CreateBookInput): Promise<Book> {
  try {
    const { googleId, title, coverImage, author: authorId, userAddedBy: userId } = input;

    const user = await UserModel.findById(userId);
    if (!user) throw new Error();

    const author = await AuthorModel.findById(authorId);
    if (!author) throw new Error();

    const book = new BookModel({
      googleId,
      title,
      coverImage,
      author: author.id,
      userAddedBy: user.id
    });

    // const bookTags = [];

    // for (const tagId of tagIds) {
    //   const bookTag = await BookTagModel.create({ book: book.id, tag: tagId, userAddedBy: user.id });
    //   bookTags.push(bookTag.id);
    // }

    // book.tags = bookTags;
    // await book.save();

    // const action = await ActionModel.create({
    //   type: ActionType.CreateBook,
    //   datetime: new Date(),
    //   user: user.id,
    //   book: book.id
    // });

    // if (user.booksAdded) user.booksAdded.push(book.id);
    // else user.booksAdded = [book.id];

    // if (user.bookTagsAdded) user.bookTagsAdded.push(...bookTags);
    // else user.bookTagsAdded = [...bookTags];

    // if (user.actions) user.actions.push(action.id);
    // else user.actions = [action.id];

    // await user.save();
    // await user.publishAction(action.id);

    await book.save();

    return book;
  } catch (error) {
    throw error;
  }
}
