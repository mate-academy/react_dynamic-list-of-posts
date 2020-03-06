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
      <p className="comment__name">{name}</p>
      <p className="comment__body">{body}</p>
      <div className="comment__email">
        <a href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </div>
  );
};
