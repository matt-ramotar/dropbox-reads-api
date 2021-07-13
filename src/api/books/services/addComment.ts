import { BookModel, CommentModel } from "../../../models";
import { BookNotFound, CommentNotFound, RelationshipAlreadyExists } from "../../../errors";
import isIn from "../../../helpers/isIn";

export default async function addComment(bookId: string, commentId: string): Promise<void> {
    try {
      const book = await BookModel.findById(bookId);
      if (!book) throw new BookNotFound();
  
      const comment = await CommentModel.findById(commentId);
      if(!comment) throw new CommentNotFound();
      
      if (isIn(commentId, book.bookCommentIds)) throw new RelationshipAlreadyExists();
  
      if (book.bookCommentIds) book.bookCommentIds.push(commentId);
      else book.bookCommentIds = [commentId];

      await book.save();
    } catch (error) {
      throw error;
    }
  }