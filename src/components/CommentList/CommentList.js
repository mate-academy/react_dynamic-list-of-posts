import React from 'react';
import './CommentList.css';

import PropTypes from 'prop-types';
import { Comments } from '../Comment/Comment';

export const CommentList = ({ comments }) => (
  <div className="card w-75">
    <h4>Comments:</h4>
    {comments.map(comment => (
      <Comments comment={comment} key={comment.id} />))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
