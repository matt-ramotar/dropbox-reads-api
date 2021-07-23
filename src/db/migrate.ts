import mongoose from "mongoose";
import Book from "../api/books/models/Book";
import createReview from "../api/reviews/services/createReview";
import extractUsername from "../helpers/extractUsername";
import { AuthorModel, BookModel, RoleModel, TagModel, UserModel } from "../models";
import { MONGODB_URI } from "../util/secrets";
import { createBook } from "./lib/createBook";
import { fetchAccessToken } from "./lib/fetchAccessToken";
import { fetchDropboxer } from "./lib/fetchDropboxer";
import { fetchGoogleBook } from "./lib/fetchGoogleBook";
import { responses } from "./responses";

mongoose
  .connect(MONGODB_URI!!, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

async function migrate() {
  try {
    for (const response of responses) {
      const { email, role, googleId, tags: tagString, reason } = response;

      const tags = tagString.split(", ");

      const username = extractUsername(email);

      const accessToken = await fetchAccessToken();
      const dropboxer = await fetchDropboxer(email, accessToken);

      const { photo, job_title, first_name, last_name } = dropboxer;

      let roleObj = await RoleModel.findOne({
        $or: [{ role: role }, { role: job_title }]
      });

      if (!roleObj) {
        if (role) roleObj = await RoleModel.create({ role });
        else if (job_title) roleObj = await RoleModel.create({ role: job_title });
      }

      let userObj = await UserModel.findOne({ username });
      if (!userObj) {
        userObj = await UserModel.create({
          firstName: first_name,
          lastName: last_name,
          username: username,
          email: email,
          picture: photo,
          roleId: roleObj?._id
        });
      }

      const googleBook = await fetchGoogleBook(googleId);

      const firstAuthor = googleBook.volumeInfo.authors[0];
      const firstAuthorNames = firstAuthor.split(" ");
      const firstAuthorFirstName = firstAuthorNames[0];
      const firstAuthorLastName = firstAuthorNames.length === 2 ? firstAuthorNames[1] : firstAuthorNames[2];

      let authorObj = await AuthorModel.findOne({ name: firstAuthor });
      if (!authorObj) {
        authorObj = await AuthorModel.create({
          name: firstAuthor,
          firstName: firstAuthorFirstName,
          lastName: firstAuthorLastName
        });
      }

      const tagIds = [];

      if (googleBook.volumeInfo.categories && googleBook.volumeInfo.categories.length > 0) {
        for (const tag of [...tags, ...googleBook.volumeInfo.categories]) {
          let tagObj = await TagModel.findOne({ tag });
          if (!tagObj) tagObj = await TagModel.create({ tag });
          tagIds.push(tagObj._id);
        }
      }

      let bookObj = (await BookModel.findOne({ googleId })) as Book;
      if (!bookObj) {
        bookObj = await createBook(
          googleId,
          googleBook.volumeInfo.title,
          googleBook.volumeInfo.description ?? "",
          googleBook.volumeInfo.imageLinks?.large
            ? googleBook.volumeInfo.imageLinks.large
            : googleBook.volumeInfo.imageLinks?.thumbnail
            ? googleBook.volumeInfo.imageLinks.thumbnail
            : "",
          authorObj._id,
          tagIds,
          userObj._id
        );
      }

      if (reason) {
        await createReview(userObj._id, bookObj.id, 5, reason);
      }
    }
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.close();
  // upsert role
  // extract username
  // fetch Dropboxer
  // upsert user
  // fetch book from Books API
  // upsert author
  // upsert tags
  // upsert author
  // upsert tags
  // upsert book
  // create review
}

migrate();
