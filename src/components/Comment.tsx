import React from 'react';
import './Comment.css';

type Props = {
  comment: CommentFromServer;
};

export const Comment: React.FC<Props> = ({ comment }) => {
  const { name, body, email } = comment;

  return (
    <>
      <p className="comment__user-name">
        {name}
      </p>
      <p className="comment__user-email">
        {email}
      </p>
      <p className="comment__user-text">
        {body}
      </p>
    </>
  );
};
