import React, { FC } from 'react';

type Props = Comment;

export const Comment: FC<Props> = ({ name, body, email }) => (
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
