import { DocumentType } from "@typegoose/typegoose";
import { CreateCommentInput } from "../entities/CreateCommentInput";
import Comment from "../models/Comment";
import addChildComment from "./addChildComment";
import addCommentReaction from "./addCommentReaction";
import createComment from "./createComment";

interface CommentService {
  createComment(input: CreateCommentInput): Promise<DocumentType<Comment>>;
  addChildComment(childId: string, parentId: string): Promise<void>;
  addCommentReaction(commentId: string, commentReactionId: string): Promise<void>;
}

export default class RealCommentService implements CommentService {
  public async createComment(input: CreateCommentInput): Promise<DocumentType<Comment>> {
    return await createComment(input);
  }

  public async addChildComment(childId: string, parentId: string): Promise<void> {
    return await addChildComment(childId, parentId);
  }

  public async addCommentReaction(commentId: string, commentReactionId: string): Promise<void> {
    return await addCommentReaction(commentId, commentReactionId);
  }
}
