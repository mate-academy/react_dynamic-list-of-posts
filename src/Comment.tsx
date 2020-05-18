import React from 'react';
import { Comments } from './helper';

type Props = {
  comment: Comments;
};

const Comment: React.FC<Props> = ({ comment: { name, email, body } }) => {
  // console.log(comment)
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

export default Comment;
