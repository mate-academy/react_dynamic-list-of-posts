import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';

interface Props {
  commentsList: CommentType[];
}

export const CommentList: FC<Props> = ({ commentsList }) => (
  <div className="comment">
    {commentsList.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </div>
);
