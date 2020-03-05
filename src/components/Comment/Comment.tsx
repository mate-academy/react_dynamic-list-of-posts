import React, { FC } from 'react';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = (props) => {
  const { comment } = props;
  const { name, body, email } = comment;

  return (
    <article className="message is-dark">
      <div className="message-header">
        <p>{name}</p>
      </div>
      <div className="message-body">
        <p>{body}</p>
        <strong>{email}</strong>
      </div>
    </article>
  );
};
