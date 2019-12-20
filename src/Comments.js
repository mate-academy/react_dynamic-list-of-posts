import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ postComments }) => (
  <div className="commentList">
    <h3>Comments</h3>
    {postComments.map(
      commentItself => (
        <Comment comment={commentItself} key={commentItself.id} />)
    )}
  </div>
);

CommentList.propTypes
  = { postComments: PropTypes.oneOfType([PropTypes.array]).isRequired };

export default CommentList;
