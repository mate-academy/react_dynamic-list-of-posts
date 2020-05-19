import React from 'react';
import { Comments } from '../api/api';
import Comment from './Comment';

type Props = {
  comments: Comments[];
}

const CommentList: React.FC<Props> = ({ comments }) => (
  <ul className="posts__comments comments">
    <hr />
    <h3>Comments:</h3>
    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    ))}
  </ul>
);

export default CommentList;
