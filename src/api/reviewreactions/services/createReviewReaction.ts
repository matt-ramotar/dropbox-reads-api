import { DocumentType } from "@typegoose/typegoose";
import { ReviewReactionModel } from "../../../models";
import ReviewReaction from "../models/ReviewReaction";

export default async function createReviewReaction(
  reviewId: string,
  userId: string,
  reactionId: string
): Promise<DocumentType<ReviewReaction>> {
  try {
    return await ReviewReactionModel.create({
      reviewId,
      userId,
      reactionId
    });
  } catch (error) {
    throw error;
  }
}
