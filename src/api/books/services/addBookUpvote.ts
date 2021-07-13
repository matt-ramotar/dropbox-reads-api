import isIn from "../../../helpers/isIn";
import { BookNotFound, BookUpvoteNotFound, RelationshipAlreadyExists } from "../../../errors";
import { BookModel, BookUpvoteModel } from "../../../models";

export default async function addBookUpvote(bookId: string, upvoteId: string): Promise<void> {
    try {
        const book = await BookModel.findById(bookId);
        if (!book) throw new BookNotFound();

        const upvote = await BookUpvoteModel.findById(upvoteId);
        if (!upvote) throw new BookUpvoteNotFound();

        if (isIn(upvoteId, book.bookUpvoteIds)) throw new RelationshipAlreadyExists();

        if (book.bookUpvoteIds) book.bookUpvoteIds.push(upvoteId);
        else book.bookUpvoteIds = [upvoteId];

        await book.save();
    } catch (error) {
        throw error;
    }
}