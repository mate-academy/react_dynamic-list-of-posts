import { Comment, CommentData, Post } from '../../types';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../utils/comments';

type CommentsService = {
  getPostComments: (post: Post) => Promise<Comment[]>;
  leaveComment: (post: Post, comment: CommentData) => Promise<Comment>;
  deleteComment: (comment: Comment) => Promise<void>;
};

const realCommentsService: CommentsService = {
  getPostComments: post => getPostComments(post.id),

  leaveComment: (post, comment) =>
    createComment({ ...comment, postId: post.id }),

  deleteComment: comment => {
    return new Promise((resolve, reject) => {
      deleteComment(comment.id)
        .then(() => resolve())
        .catch(() => reject());
    });
  },
};

export const commentsService = realCommentsService;
