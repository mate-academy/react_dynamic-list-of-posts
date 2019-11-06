import React from 'react';
import User from './User';
import CommentList from './CommentList';

function Post({ post }) {
  return (
    <div className="ui card">
      <div className="content">
        <div className="header">{post.title}</div>
      </div>

      <div className="content">
        <div className="ui small feed">{post.body}</div>
      </div>

      <User user={post.user} />
      <CommentList commentList={post.comments} />
    </div>
  );
}

export default Post;
