import React from 'react';

type Props = {
  comment: Comment;
};

export const CommentsList: React.FC<Props> = ({ comment }) => {
  const {
    name,
    body,
    email,
  } = comment;

  return (
    <div>
      <h3>
        {name}
      </h3>
      <p>
        <a href={`mailot:${email}`}>
          {email}
        </a>
      </p>
      <p>
        {body}
      </p>
    </div>
  );
};
