import React, { FC } from 'react';
import './Comment.css';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = (props) => {
  const { comment: { name, email, body } } = props;

  return (
    <li className="comment">
      <p className="comment__autor">
        <span>{`autor: ${name} `}</span>
        <span>{`e-mail: ${email}`}</span>
      </p>
      <p className="comment__text">{body}</p>
    </li>
  );
};
