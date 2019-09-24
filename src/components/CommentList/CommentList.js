import React from 'react';
import Comment from '../Comment/Comment';
import './CommentList.css';
import { CommentListPropTypes } from '../../constants/prototypes';

const CommentList = ({ comments }) => (
  <div className="comments">
    <h3 className="comments-heading">Comments:</h3>
    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    ))}
  </div>
);

CommentList.propTypes = CommentListPropTypes;

export default CommentList;
