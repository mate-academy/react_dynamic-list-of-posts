import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment';
import './commentlist.css';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    <h3>Comments</h3>
    <div className="comment-list__body">
      {comments && comments.map(currentComment => (
        <Comment comment={currentComment} key={currentComment.id} />))
      }
    </div>
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
      body: PropTypes.string,
    })
  ),
};

CommentList.defaultProps = {
  comments: null,
};

export default CommentList;
