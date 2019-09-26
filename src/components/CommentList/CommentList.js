import React from 'react';
import Comment from '../Comment/Comment';
import { CommentListProps } from '../PropTypes/PropTypes';
import './CommentList.css';

const CommentList = ({ filteredComments }) => (
  <div className="comment-list">
    <h4 className="comment-list__title">
      Users comments
    </h4>
    {filteredComments.map(comment => (
      <Comment
        comment={comment.body}
        email={comment.email}
        key={comment.id}
      />
    ))}
  </div>
);

CommentList.propTypes = CommentListProps;

export default CommentList;
