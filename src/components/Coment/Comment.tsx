import React, { FC } from 'react';

interface Props {
  comment: CommentInterface;
}

export const Comment: FC<Props> = ({ comment }) => {
  const { name, body, email } = comment;

  return (
    <div className="comment">
      <h4>{name}</h4>
      <p>{body}</p>
      <a href={email}>
        {email}
      </a>
    </div>
  );
};
