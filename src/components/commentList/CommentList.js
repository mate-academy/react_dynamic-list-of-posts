import React from 'react';
import PropTypes from 'prop-types';

import Comment from '../comment/Comment';

function CommentList({ comments }) {

  return (
    comments.map(comment => (
      <Comment
        comment={comment}
        key={comment.id}
      />
    ))
  )
}

Comment.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired
}
//
export default CommentList;
