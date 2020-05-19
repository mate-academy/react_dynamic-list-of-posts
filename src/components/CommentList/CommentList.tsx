import React from 'react';
import { Comment } from '../Comment/Comment';
import './CommentList.css';

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
