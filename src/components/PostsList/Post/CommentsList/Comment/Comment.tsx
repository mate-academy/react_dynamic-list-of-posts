import React, { FC } from 'react';
import './Comment.css';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({
  comment,
}) => {
  const {
    name,
    email,
    body,
  } = comment;

  return (
    <li className="comment">
      <p className="comment__email">
        {email}
      </p>
      <p className="comment__name">
        {name}
      </p>
      <p className="comment__body">
        {body}
      </p>
    </li>
  );
};
