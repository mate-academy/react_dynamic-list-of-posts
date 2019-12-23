import PropTypes from 'prop-types';
import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div>
    {comments.map(currentComment => (
      <Comment comment={currentComment} key={currentComment.id} />))}
  </div>
);

CommentList.propTypes
  = { comments: PropTypes.oneOfType([PropTypes.array]).isRequired };

export default CommentList;
