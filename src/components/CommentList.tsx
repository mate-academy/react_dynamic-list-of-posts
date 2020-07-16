import React from 'react';
import { Comment } from '../interfaces/data';
import { CommentItem } from './CommentItem';

interface Props {
  comments: Comment[];
}

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <>
      <p className="post__comments-num">
        Comments (
        {comments.length}
        ):
      </p>
      <ul className="post__comments">
        {comments.map(comment => (
          <li key={comment.id}>
            <CommentItem {...comment} />
          </li>
        ))}
      </ul>
    </>
  );
};
