import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <>
    <h5> comments:</h5>
    {comments.map(currentComment => (
      <Comment comment={currentComment} />
    ))}
  </>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object])).isRequired,
};

export default CommentList;
