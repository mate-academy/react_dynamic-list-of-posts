import React, { FC } from 'react';
import { Comment } from './Comment';

interface Props {
  comments?: CommentInterface[];
}

export const CommentList: FC<Props> = ({ comments }) => (
  <>
    {comments && comments.map(comment => (
      <li key={comment.id} className="comment">
        <Comment comment={comment} />
      </li>
    ))}
  </>
);
