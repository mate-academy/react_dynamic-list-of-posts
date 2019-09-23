import React from 'react';
import { CommentProps } from '../constants/PropTypes';
import './Comment.css';
import User from '../User/User';

const Comment = ({ comment }) => (
  <li className="comment">
    <div className="comment-text">{comment.body}</div>
    <User email={comment.email} name={comment.name} />
  </li>
);

Comment.propTypes = CommentProps;

export default Comment;
