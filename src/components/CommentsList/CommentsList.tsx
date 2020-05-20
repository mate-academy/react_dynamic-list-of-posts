import React from 'react';
import Comment from '../Comment/Comment';
import './CommentsList.css';
import { Comments } from '../../helpers/api';

interface CommentsList {
  comments: Comments[];
}

const CommentsList: React.FC<CommentsList> = ({ comments }) => (
  <div key="CommentsList" className="post__comments-list">
    <p className="post__comments-list_title">
      Comments:
    </p>
    {comments.map(comment => (
      <Comment key={comment.id} {...comment} />
    ))}
  </div>
);

export default CommentsList;
