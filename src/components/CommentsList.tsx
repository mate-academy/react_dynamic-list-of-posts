import React, { memo } from 'react';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

type Props = {
  comments: Comment[];
  onDelete: (id: number) => void;
  deletingErrorPostIds: number[];
};

export const CommentsList: React.FC<Props> = memo(function CommentsList({
  comments,
  onDelete,
  deletingErrorPostIds,
}) {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={onDelete}
          deletingErrorPostIds={deletingErrorPostIds}
        />
      ))}
    </>
  );
});
