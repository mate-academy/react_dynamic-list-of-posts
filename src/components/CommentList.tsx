import React, { FC } from 'react';
import { Comment } from './Comment';

interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = ({ comments }) => {
  return (
    <ul className="comments">
      {comments.map(comment => (
        <li className="comment" key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
};
