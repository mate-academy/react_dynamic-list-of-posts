import React from 'react';
import Comment from './Comment';

function CommentList({ commentList }) {
  return (
    <div className="extra content">
      <div className="content">
        <div className="ui comments">
          <h3 className="ui dividing header">Comments</h3>
        </div>
      </div>
      {commentList.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentList;
