import React from 'react';

interface Props {
  comment: Comment;
}

export const Comment: React.FC<Props> = (props) => {
  const { comment } = props;

  return (
    <li className="wrapper__list">
      <p className="wrapper__list-head">{comment.name}</p>
      <p>{comment.email}</p>
      <p>{comment.body}</p>
    </li>
  );
};
