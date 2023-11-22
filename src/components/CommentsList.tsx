import React from 'react';
import { CommentItem } from './CommentItem';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[] | null,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  tempComment: Comment | null,
};

export const CommentsList: React.FC<Props> = ({
  comments,
  setComments,
  tempComment,
}) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments?.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          setComments={setComments}
        />
      ))}

      {tempComment && (
        <CommentItem
          comment={tempComment}
          setComments={setComments}
        />
      )}
    </>
  );
};
