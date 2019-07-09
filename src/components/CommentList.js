import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <p>
    {comments.map(comment => <Comment comments={comment} />)}
  </p>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object])).isRequired,
};

export default CommentList;
