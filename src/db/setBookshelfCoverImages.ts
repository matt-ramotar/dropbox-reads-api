import mongoose from "mongoose";
import { BookshelfModel, UserModel } from "../models";
import { MONGODB_URI } from "../util/secrets";

mongoose
  .connect(MONGODB_URI!!, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

async function createBookshelves() {
  const coverImage = "https://aem.dropbox.com/cms/content/dam/dropbox/blog/files/2021/june/anne-helen-petersen/AHP-header.png";
  const users = await UserModel.find();

  for (const user of users) {
    const bookshelfIds = user.bookshelfIds;
    if (!bookshelfIds) continue;

    for (const bookshelfId of bookshelfIds) {
      try {
        const bookshelf = await BookshelfModel.findById(bookshelfId);
        if (!bookshelf) continue;
        bookshelf.coverImage = coverImage;
        await bookshelf.save();
      } catch (error) {
        console.log("ERROR", error);
        console.log("USER", user);
      }
    }
  }

  mongoose.connection.close();
}

createBookshelves();
