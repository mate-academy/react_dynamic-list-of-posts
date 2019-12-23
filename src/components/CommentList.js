import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

function CommentsList({ comments }) {
  return (
    <div className="post__comments-block">
      {comments.map(comment => <Comment comment={comment} key={comment.id} />)}
    </div>
  );
}

// eslint-disable-next-line max-len
CommentsList.propTypes = { comments: PropTypes.arrayOf(PropTypes.object).isRequired };

export default CommentsList;
