import React, { FC } from 'react';
import './Comment.css';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({ comment: { name, email, body } }) => (
  <div className="comment">
    <span role="img" aria-label="pspeech baloon">💬</span>
    <div className="comment__wrapper">
      <div className="comment__user-email">
        <h4 className="comment__title">{ name }</h4>
        <p>{ email }</p>
      </div>
      <p className="comment__body">{ body }</p>
    </div>
  </div>
);
