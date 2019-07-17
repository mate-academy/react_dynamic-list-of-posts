import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

const CommentList = ({ comments, post }) => (
  <div className="comment-list">
    {comments.map((comment) => {
      if (comment.postId === post.id) {
        return <Comment comment={comment} />;
      }

      return null;
    })}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default CommentList;
