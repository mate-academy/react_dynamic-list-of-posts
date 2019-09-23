import React from 'react';
import PropTypes from 'prop-types';

import './CommentList.css';
import Comment from '../Сomment/Comment';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentList;
