import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import './CommentList.css';

function CommentList({ comments }) {
  return (
    <div className="post__comments comments">
      {comments.map(comment => <Comment comment={comment} key={comment.id} />)}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    postID: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
};

export default CommentList;
