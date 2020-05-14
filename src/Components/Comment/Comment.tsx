import React from 'react';

interface Props {
  comment: CommentType;
}

export const Comment = (props: Props) => {
  const { comment } = props;

  return (
    <div>
      <h3>
        {comment.name}
      </h3>
      <p>
        {comment.body}
      </p>
      <p>
        {comment.email}
      </p>
    </div>
  );
};
