import React, { FC } from 'react';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({ comment }) => (
  <li className="member">
    <p className="member__name">{comment.name}</p>
    <p>{comment.body}</p>
    <p>
      <a className="member__email" href={`mailto:${comment.email}`}>
        {comment.email}
      </a>
    </p>
  </li>
);
