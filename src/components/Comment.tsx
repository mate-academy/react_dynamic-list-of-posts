import React from 'react';

type Props = {
  comment: Comment;
};

const Comment: React.FC<Props> = ({ comment }) => {
  const { body, name, email } = comment;

  return (
    <li className="posts__comments-item">
      <p>
        {body}
      </p>
      <span className="posts__comments-item-info">
        name:
        {' '}
        {name}
      </span>
      <span className="posts__comments-item-info">
        email:
        {' '}
        {email}
      </span>
    </li>
  );
};

export default Comment;
