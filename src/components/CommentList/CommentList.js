import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import './CommentList.css';

function CommentList({ comments }) {
  return (
    <div className="comment-list">
      {
        comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))
      }
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      body: PropTypes.string,
    })
  ).isRequired,
};

export default CommentList;
