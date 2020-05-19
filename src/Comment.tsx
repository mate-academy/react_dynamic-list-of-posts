import React from 'react';

type Props = {
  comment: Comment;
};

export const Comment: React.FC<Props> = ({ comment }) => {
  const { name, body, email } = comment;

  return (
    <div className="post__comment">
      <p>{name}</p>
      <p>{body}</p>
      <p>{email}</p>
    </div>
  );
};
