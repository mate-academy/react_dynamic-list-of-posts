import React, { FC } from 'react';

interface Props {
  name: string;
  email: string;
  body: string;
}

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
