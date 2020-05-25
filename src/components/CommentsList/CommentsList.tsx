import React from 'react';
import CommentItem from '../Comment/Comment';
import './CommentsList.css';
import { Comment } from '../../helpers/api';

interface CommentsList {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsList> = ({ comments }) => (
  <div key="CommentsList" className="post__comments-list">
    <p className="post__comments-list_title">
      Comments:
    </p>
    {comments.map(comment => (
      <CommentItem key={comment.id} {...comment} />
    ))}
  </div>
);

export default CommentsList;
