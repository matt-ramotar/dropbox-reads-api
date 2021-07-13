export default async function addComment(bookId: string, commentId: string): Promise<void> {
    try {
      const book = await BookModel.findById(bookId);
      if (!book) throw new BookNotFound();
  
      if (isIn(commentId, book.reviewIds)) throw new RelationshipAlreadyExists();
  
      if (book.reviewIds) book.reviewIds.push(reviewId);
      else book.reviewIds = [reviewId];
      await book.save();
    } catch (error) {
      throw error;
    }
  }