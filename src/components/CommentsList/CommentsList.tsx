import React from 'react';
import { Comment } from '../../types/Comment';
import { CommentItem } from '../CommentItem/CommentItem';

type Props = {
  comments: Comment[],
  onDelete: (commentId: number) => void,
};

export const CommentsList: React.FC<Props> = React.memo(({
  comments,
  onDelete,
}) => {
  return (
    <>
      <p className="title is-4">Comments:</p>
      <ul
        className="comments-list"
        style={{ listStyle: 'none', margin: '0', padding: '0' }}
      >
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} onDelete={onDelete} />
        ))}
      </ul>
    </>
  );
});
