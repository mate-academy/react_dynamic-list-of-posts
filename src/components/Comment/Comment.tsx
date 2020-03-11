import React, { FC } from 'react';
import './Comment.css';

interface Props {
  comment: CommentInterface;
}

export const Comment: FC<Props> = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <>
      <p>
        <span className="name">
          {name}
        </span>
        {` email:${email}`}
      </p>
      <p>
        {body}
      </p>
    </>
  );
};
