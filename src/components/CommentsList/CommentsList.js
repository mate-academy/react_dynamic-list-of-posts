import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import './CommentsList.css';

const CommentsList = ({ comments }) => (
  <div className="ui comments">
    {comments.map(comment => (<Comment comment={comment} key={comment.id} />))}
  </div>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentsList;
