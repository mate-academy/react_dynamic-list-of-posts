import React from 'react';

type Props = {
  name: string;
  body: string;
  email: string;
};

export const CommentListItem: React.FC<Props> = ({ name, body, email }) => {
  return (
    <li className="comment-list__item">
      <h3>{name}</h3>
      <h4>{email}</h4>
      <p>{body}</p>
    </li>
  );
};
