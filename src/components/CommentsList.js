import React from 'react';
import Proptypes from 'prop-types';
import Comment from './Comment';

function CommentList({ commentList }) {
  return (
    <>
      {commentList.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </>
  );
}

CommentList.propTypes = {
  commentList: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default CommentList;
