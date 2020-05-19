import React, { FC } from 'react';

interface Props {
  comment: Comment;
}

export const Comment: FC<Props> = ({ comment }) => {
  const { name, email, body } = comment;

  return (
    <li className="has-background-grey-light px1">
      <h4 className="title is-4"><b>{name}</b></h4>
      <p>{body}</p>
      <a href={`mailto:${email}`}>{email}</a>
    </li>
  );
};
