import React, { FC } from 'react';

export const Comment: FC<Comment> = ({ name, body, email }) => (
  <div className="comment">
    <span>
      comment:
    </span>
    <h4>{name}</h4>
    <p>
      {body}
    </p>
    <p className="commentator">
      {email}
    </p>
  </div>
);
