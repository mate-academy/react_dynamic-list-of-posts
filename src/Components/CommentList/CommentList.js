import React from 'react';
import Comment from '../Comment/Comment';
import { CommentListProps } from '../PropTypes/PropTypes';
import './CommentList.css';

const CommentList = ({ commentsList }) => (
  <div className="comment-list">
    {commentsList.map(comment => (
      <Comment
        comment={comment.body}
        key={comment.id}
        email={comment.email}
      />
    ))}
  </div>
);

CommentList.propTypes = CommentListProps;

export default CommentList;
