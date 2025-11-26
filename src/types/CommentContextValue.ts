import { Action } from "./Action";
import { Comment, CommentData } from "./Comment";

export interface CommentContextValue {
  comment: Comment;
  dispatch: React.Dispatch<Action>;
  onAddComment: (comment: CommentData) => Promise<Comment>;
}
