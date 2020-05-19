import React from 'react';
import { Comment } from './helper';

type Props = {
  comment: Comment;
};

const CommentItem: React.FC<Props> = ({ comment: { name, email, body } }) => {
  return (
    <>
      <p>{name}</p>
      <p>
        {email}
        {' '}
      </p>
      <p>{body}</p>
    </>
  );
};

export default CommentItem;
