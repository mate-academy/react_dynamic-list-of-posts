import React from 'react';
import { Comment } from './Comment/Comment';

type Props = {
  comments: Comment[];
};

export const CommentList: React.FC<Props> = ({ comments }) => (
  <ul className="post__comments">
    {comments.map(currentComment => (
      <Comment {...currentComment} key={currentComment.id} />
    ))}
  </ul>
);
