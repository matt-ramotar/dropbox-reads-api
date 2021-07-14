import { BookModel } from "../../../models";
import { GodBook } from "../../books/models/GodBook";

export default async function getBooksMatchingKeyword(keyword: string): Promise<GodBook[]> {
    // Search in book title, book author, and book tag fields
    const matchingTitles = await BookModel.find({title: {$regex: keyword, $options: 'i'}});
    const books = [];
    for (const title of matchingTitles) {
        books.push(await title.toGodBook());
    }
    return books;
}