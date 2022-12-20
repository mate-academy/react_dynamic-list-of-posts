import React from 'react';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

type Props = {
  onCommentDelete: (id: number) => void,
  comments: Comment[],
};

export const CommentsList: React.FC<Props> = ({
  onCommentDelete,
  comments,
}) => {
  return (
    <>
      <p className="title is-4">Comments:</p>
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onCommentDelete={onCommentDelete}
        />
      ))}
    </>
  );
};
