import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import './styles/Comment.css';

const CommentList = ({ commentsList }) => (
  <div className="comment">
    <h3 className="comment__title">Comments</h3>
    {
      commentsList.map(item => (
        <Comment comment={item} />
      ))
    }
  </div>
);

CommentList.propTypes = {
  commentsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
};

export default CommentList;
