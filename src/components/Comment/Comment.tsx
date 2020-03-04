import React, { FC } from 'react';
import './Comment.css';
import { CommentType } from '../../utils/interfaces';

interface Props {
  comment: CommentType;
}

export const Comment: FC<Props> = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <div className="comment">
      <p className="comment__name">
        {`${name} (${email})`}
      </p>
      <p className="comment__body">
        {body}
      </p>
    </div>
  );
};
