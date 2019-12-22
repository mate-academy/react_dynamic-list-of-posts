import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments }) => (
  <div className="commentList">
    <h3>Comments</h3>
    <hr />
    {comments.map(
      commentItself => (
        <Comment comment={commentItself} key={commentItself.id} />)
    )}
  </div>
);

CommentList.propTypes
  = { comments: PropTypes.oneOfType([PropTypes.array]).isRequired };

export default CommentList;
