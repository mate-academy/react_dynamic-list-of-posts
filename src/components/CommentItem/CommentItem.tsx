import React from 'react';

interface Props {
  body: string;
  name: string;
  email: string;
}

export const CommentItem: React.FC<Props> = ({ body, name, email }) => (
  <li className="post__comment">
    <a href={`mailto:${email}`} className="post__email">
      {email.toLowerCase()}
    </a>
    <h6>{name}</h6>
    <p>{body}</p>
  </li>
);
