import React from 'react';

const Comment = cmnt => (
  <div className="comment">
    {cmnt.body}
    <div className="cmntAuthor">
      <div className="author">
        {cmnt.name}
      </div>
      <div className="author">
        {cmnt.email}
      </div>
    </div>
  </div>
);

export default Comment;
