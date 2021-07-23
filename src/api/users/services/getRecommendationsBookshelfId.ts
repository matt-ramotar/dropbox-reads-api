import { BookshelfNotFound, UserNotFound } from "../../../errors";
import { UserModel } from "../../../models";

export default async function getRecommendationsBookshelfId(userId: string): Promise<string> {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new UserNotFound();

    const godUser = await user.toGodUser();

    const bookshelves = godUser.bookshelves ?? [];

    for (const bookshelf of bookshelves) {
      if (bookshelf.name === "Recommendations") return bookshelf.id;
    }

    throw new BookshelfNotFound();
  } catch (error) {
    throw error;
  }
}
