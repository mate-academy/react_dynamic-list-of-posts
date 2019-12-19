import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div className="post__comments comments">
    <h2 className="comments__title">Comments:</h2>
    {comments.map(
      comment => <Comment key={comment.id} comment={comment} />
    )}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
