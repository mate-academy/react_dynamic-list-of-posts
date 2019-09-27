import React from 'react';
import './CommentList.css';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';

const CommentList = ({ comments }) => (
  <div className="comments">
    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    ))}
  </div>
);

const commentListProps = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  body: PropTypes.string,
  email: PropTypes.string,
}).isRequired;

CommentList.propTypes = {
  comments: PropTypes.arrayOf(commentListProps).isRequired,
};

export default CommentList;
