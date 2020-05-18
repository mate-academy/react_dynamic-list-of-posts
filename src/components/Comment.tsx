import React from 'react';

export const Comment: React.FC<Comment> = ({ name, body, email }) => (
  <li className="post__comment comment">
    <p className="comment__name">
      {name}
    </p>
    <p className="comment__body">
      {body}
    </p>
    <a href={`mailto:${email}`} className="comment__email">
      {email}
    </a>
  </li>
);
