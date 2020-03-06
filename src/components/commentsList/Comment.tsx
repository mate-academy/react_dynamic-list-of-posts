import React, { FC } from 'react';

export const Comment: FC<Comment> = (comment) => {
  const { name, body, email } = comment;

  return (
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
};
