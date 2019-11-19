import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';

function CommentList({ commentList }) {
  return (
    <ul className="comment-list">
       Comments:
      {commentList.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </ul>
  );
}

CommentList.defaultProps = {
  commentList: [],
};

CommentList.propTypes = {
  commentList: PropTypes.arrayOf(PropTypes.object),
};

export default CommentList;
