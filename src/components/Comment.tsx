import React, { FC } from 'react';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({ comment }) => (
  <li className="list-group-item list-group-item-primary">
    <p>{`Comment: ${comment.name}`}</p>
    <p>{comment.body}</p>
    <p>{comment.email}</p>
  </li>
);
