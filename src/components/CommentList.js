import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ commentOne }) => (
  <div className="comments">
    <h2>Comments</h2>
    { commentOne.map(comment => (
      <Comment item={comment} key={comment.id} />
    )) }
  </div>
);

CommentList.propTypes = {
  commentOne: PropTypes.arrayOf(
    PropTypes.any
  ).isRequired,
};

export default CommentList;
