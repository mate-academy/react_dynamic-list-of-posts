import React from 'react';
import './Comment.css';
import { CommentProps } from '../PropTypes/PropTypes';

const Comment = ({ comment, email }) => (
  <div className="comment">
    <p className="comment__email">
      {email}
    </p>
    <p className="comment__text">
      {comment}
    </p>
  </div>
);

Comment.propTypes = CommentProps;

export default Comment;
