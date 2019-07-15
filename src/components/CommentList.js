import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

const CommentList = ({ comments }) => (
  <>
    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    ))}
  </>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
