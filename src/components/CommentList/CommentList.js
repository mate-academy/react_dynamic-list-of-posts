import React from 'react';
import './CommentList.css';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';

function CommentList({ comments }) {
  return comments.map(comment => <Comment comment={comment} />);
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.stirng,
    })
  ),
};

export default CommentList;
