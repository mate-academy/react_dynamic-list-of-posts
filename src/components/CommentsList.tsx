import React, {
  useContext,
} from 'react';
import { CommentContext } from './Context/CommentContext';
import { CommentItem } from './CommentItem';

export const CommentsList: React.FC = () => {
  const { comments } = useContext(CommentContext);

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => (
        <CommentItem comment={comment} key={comment.id} />
      ))}

    </>
  );
};
