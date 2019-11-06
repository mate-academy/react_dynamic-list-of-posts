import React from 'react';

function Comment({ comment }) {
  return (
    <div className="comments">
      <div className="content">
        <div className="ui small feed author">
          {`${comment.name}, ${comment.email}`}
        </div>
        <div className="text">{comment.body}</div>
      </div>
    </div>
  );
}

export default Comment;
