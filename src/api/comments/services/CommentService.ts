import { CreateCommentInput } from "../entities/CreateCommentInput";
import Comment from "../models/Comment";
import addChildComment from "./addChildComment";
import createComment from "./createComment";

interface CommentService {
  createComment(input: CreateCommentInput): Promise<Comment>;
  addChildComment(childId: string, parentId: string): Promise<void>;
}

export default class RealCommentService implements CommentService {
  public async createComment(input: CreateCommentInput): Promise<Comment> {
    return await createComment(input);
  }

  public async addChildComment(childId: string, parentId: string): Promise<void> {
    return await addChildComment(childId, parentId);
  }
}
