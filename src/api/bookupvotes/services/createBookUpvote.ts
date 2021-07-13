import BookUpvote from "../../bookupvotes/models/BookUpvote";
import { BookUpvoteModel } from "../../../models";
import { DocumentType } from "@typegoose/typegoose";
import { RelationshipAlreadyExists } from "../../../errors";

export default async function createBookUpvote(bookId: string, userId: string): Promise<DocumentType<BookUpvote>> {
    try {
        if (await BookUpvoteModel.exists({bookId: bookId, userId: userId})) {
            throw RelationshipAlreadyExists;
        }
        
        return await BookUpvoteModel.create({
            bookId,
            userId,
        });
    } catch (error) {
        throw error;
    }
}