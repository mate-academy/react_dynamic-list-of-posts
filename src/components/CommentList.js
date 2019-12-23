import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div className="comments">
    <h2>Comments</h2>
    { comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    )) }
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};

export default CommentList;
