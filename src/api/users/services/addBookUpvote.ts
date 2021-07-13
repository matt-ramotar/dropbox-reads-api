import {  UserModel, BookUpvoteModel } from "../../../models";
import { UserNotFound, BookUpvoteNotFound } from "../../../errors";

export default async function addBookUpvote(userId: string, upvoteId: string): Promise<void> {
    try {
      const user = await UserModel.findById(userId);
      if (!user) throw new UserNotFound();
    
      const upvote = await BookUpvoteModel.findById(upvoteId);
      if (!upvote) throw new BookUpvoteNotFound();

      if (user.bookUpvoteIds) user.bookUpvoteIds.push(upvoteId);
      else user.bookUpvoteIds = [upvoteId];
      
      await user.save();
    } catch (error) {
      throw error;
    }
}