import PropTypes from 'prop-types';
import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <dl>
    {comments.map(currentComment => (
      <Comment
        comment={currentComment}
        key={currentComment.id}
      />
    ))}
  </dl>
);

CommentList.propTypes = {
  comments: PropTypes
    .arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
};

export default CommentList;
