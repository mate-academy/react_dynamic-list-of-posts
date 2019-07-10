import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comments }) => (
  <div className="comments">
    <br />
    <b>Comment</b>
    {' '}
    {comments.body}
  </div>
);

Comment.propTypes = {
  comments: PropTypes.shape({
    body: PropTypes.string,
  }).isRequired,
};

export default Comment;
