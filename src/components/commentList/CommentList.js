import React from 'react';
import Proptypes from 'prop-types';
import Comment from '../comment/Comment';

function CommentList({ commentList }) {
  return (
    <div className="ui comments">
      {commentList.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  commentList: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default CommentList;
