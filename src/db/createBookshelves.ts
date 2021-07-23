import mongoose from "mongoose";
import { ActionType } from "../api/actions/models/ActionType";
import RealActionService from "../api/actions/services/ActionService";
import RealBookshelfService from "../api/bookshelves/services/BookshelfService";
import RealUserService from "../api/users/services/UserService";
import { UserModel } from "../models";
import { MONGODB_URI } from "../util/secrets";

mongoose
  .connect(MONGODB_URI!!, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

async function createBookshelves() {
  const users = await UserModel.find();

  const bookshelfService = new RealBookshelfService();
  const userService = new RealUserService();
  const actionService = new RealActionService();

  for (const user of users) {
    try {
      const bookshelf = await bookshelfService.createBookshelf("Recommendations", `${user.firstName}'s Recommendations`, user._id);
      await userService.addBookshelf(user._id, bookshelf.id);

      const action = await actionService.createAction({
        type: ActionType.CreateBookshelf,
        userId: user._id,
        bookshelfId: bookshelf.id
      });

      await userService.addAction(action._id, user._id);
      await userService.publishAction(action._id, user._id);
    } catch (error) {
      console.log("ERROR", error);
      console.log("USER", user);
    }
  }

  mongoose.connection.close();
}

createBookshelves();
