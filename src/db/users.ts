import mongoose from "mongoose";
import { UserModel } from "../models";
import { MONGODB_URI } from "../util/secrets";

mongoose
  .connect(MONGODB_URI!!, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

async function main() {
  try {
    const users = await UserModel.find();

    const godUsers = [];

    for (const user of users) {
      godUsers.push(await user.toGodUser());
    }

    godUsers.sort(function (a, b) {
      return a.firstName < b.firstName ? -1 : a.firstName > b.firstName ? 1 : 0;
    });

    for (const godUser of godUsers) {
      console.log(
        `${godUser.firstName} ${godUser.lastName} - ${godUser.role?.role}[https://app.dropboxer.net/dropabout/dropboxer/${godUser.username}]`
      );
    }
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.close();
}

main();
