import React, { FC } from 'react';
import { Comment } from '../../types';
import './NewComment.css';

interface Props {
  comment: Comment;
}

export const NewComment: FC<Props> = ({ comment }) => {
  const { name, body, email } = comment;

  return (
    <div className="comment">
      <div className="comment__name">{name}</div>
      <div className="comment__body">{body}</div>
      <div className="comment__email">
        <a href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </div>
  );
};
