import BookUpvote from "../../bookupvotes/models/BookUpvote";
import { BookUpvoteModel } from "../../../models";
import { DocumentType } from "@typegoose/typegoose";

export default async function createBookUpvote(bookId: string, userId: string): Promise<DocumentType<BookUpvote>> {
    try {
        return await BookUpvoteModel.create({
            bookId,
            userId,
        });
    } catch (error) {
        throw error;
    }
}