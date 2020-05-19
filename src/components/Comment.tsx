import React from 'react';

type Props = {
  comment: CommentType;
};

export const Comment: React.FC<Props> = ({ comment }) => (
  <li className="comment__item comment">
    <h5 className="comment__name">{comment.name}</h5>
    <p className="comment__body">{comment.body}</p>
    <p>
      <a href={`mailto:${comment.email}`} className="comment__email">
        {comment.email}
      </a>
    </p>
  </li>
);
