import React from 'react';
import { Comments } from '../api';
import Comment from './Comment';

type Props = {
  comments: Comments[];
};

const CommentList: React.FC<Props> = ({ comments }) => (
  <ul className="comments">
    <h3>Comments:</h3>
    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    ))}
  </ul>
);

export default CommentList;
