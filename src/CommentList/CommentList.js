import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import './CommentList.css';

const CommentList = ({ comments }) => (
  <div className="comments">
    {comments.map(item => (
      <Comment comment={item} key={item.id} />
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf({
    comment: PropTypes.shape({
      body: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default CommentList;
