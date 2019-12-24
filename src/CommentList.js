import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div>
    {comments.map(commentItem => (
      <Comment comment={commentItem} key={commentItem.id} />
    ))}
  </div>
);

CommentList.propTypes
  = { comments: PropTypes.oneOfType([PropTypes.array]).isRequired };

export default CommentList;
