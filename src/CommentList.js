import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ currentComment }) => (
  <div className="App__comment_list">
    {currentComment.map(comment => (
      <Comment dataComment={comment} />
    ))}
  </div>
);

CommentList.propTypes = {
  currentComment: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object])).isRequired,
};

export default CommentList;
