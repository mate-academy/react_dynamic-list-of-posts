import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div className="CommentList__items">
    {comments.map(comment => (
      <Comment comment={comment} />
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    body: PropTypes.string,
    map: PropTypes.func,
  }).isRequired,
};

export default CommentList;
