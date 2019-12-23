import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    <h3>Comments</h3>
    <hr />
    {comments.map(
      commentData => (
        <Comment comment={commentData} key={commentData.id} />)
    )}
  </div>
);

CommentList.propTypes
  = { comments: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired };

export default CommentList;
