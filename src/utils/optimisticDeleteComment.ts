import { Comment } from '../types/Comment';

export type Rollback = { deletedComment: Comment; deletedIndex: number };
export type OptimisticDeleteResult = {
  updatedComments: Comment[];
  rollback: Rollback;
};

export const optimisticDeleteComment = (
  comments: Comment[],
  commentId: number,
): OptimisticDeleteResult | null => {
  const deletedIndex = comments.findIndex(comment => comment.id === commentId);

  if (deletedIndex === -1) {
    return null;
  }

  const comment = comments[deletedIndex];

  return {
    updatedComments: comments.filter(item => item.id !== commentId),

    rollback: {
      deletedComment: comment,
      deletedIndex,
    },
  };
};

export const restoreComment = (
  comments: Comment[],
  rollback: Rollback,
): Comment[] => {
  if (comments.some(comment => comment.id === rollback.deletedComment.id)) {
    return comments;
  }

  const updated = [...comments];

  updated.splice(rollback.deletedIndex, 0, rollback.deletedComment);

  return updated;
};
