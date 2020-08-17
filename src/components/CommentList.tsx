import React, { FC } from 'react';
import { Comment } from './interfaces';

interface Props {
  comment: Comment;
}

const PostList: FC<Props> = ({ comment }) => {
  return (
    <li key={comment.id}>
      {comment.name}
      {' - '}
      {comment.body}
      {' - '}
      {comment.email}
    </li>
  );
};

export default PostList;
