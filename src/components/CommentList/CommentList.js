import React from 'react';
import { CommentListProps } from '../constants/PropTypes';
import './CommentList.css';
import Comment from '../Comment/Comment';

const CommentList = ({ comments }) => (
  <ul className="comment-list">
    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    ))}
  </ul>
);

CommentList.propTypes = CommentListProps;

export default CommentList;
