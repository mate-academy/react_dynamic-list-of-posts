import React from 'react';
import Proptypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <ul>
    <h2>Comments</h2>
    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    ))}
  </ul>
);

CommentList.propTypes = {
  comments: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default CommentList;
