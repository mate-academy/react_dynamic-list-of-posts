import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <ul>
    {comments.map(
      oneComment => <Comment comment={oneComment} key={oneComment.id} />
    )}
  </ul>
);

CommentList.propTypes = {
  comments:
    PropTypes.arrayOf(PropTypes.object)
      .isRequired,
};

export default CommentList;
