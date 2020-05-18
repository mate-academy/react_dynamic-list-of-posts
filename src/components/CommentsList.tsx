import React from 'react';
import Comment from './Comment';

type Props = {
  comments: Comment[];
};

const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <>
      Comments:
      <ul className="posts__comments-list">
        {comments.map(comment => (
          <Comment comment={comment} />
        ))}
      </ul>
    </>
  );
};

export default CommentsList;
