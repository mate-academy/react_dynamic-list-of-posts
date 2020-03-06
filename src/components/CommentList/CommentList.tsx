import React, { FC } from 'react';

import { Comment } from '../Comment/Comment';

interface Props{
  comments: Comments;
}

export const CommentList: FC<Props> = ({ comments }) => (
  <ul className="CommentList">
    {comments.map(comment => (
      <li key={comment.id} className="comment">
        <Comment comment={comment} />
      </li>
    ))}
  </ul>
);
