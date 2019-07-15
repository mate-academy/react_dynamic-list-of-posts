import React from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';

function CommentList({ comments }) {
  return (
    <Comments comments={comments} />
  );
}
CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
