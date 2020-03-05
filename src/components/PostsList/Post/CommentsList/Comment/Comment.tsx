import React, { FC } from 'react';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({
  comment,
}) => {
  const {
    name,
    email,
    body,
  } = comment;

  return (
    <div className="comment">
      <p className="comment__name">
        {name}
      </p>
      <p className="comment__email">
        {email}
      </p>
      <p className="comment__body">
        {body}
      </p>
    </div>
  );
};
