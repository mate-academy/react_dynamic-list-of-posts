import React from "react";

import CommentList from "../comments/CommentList";
import Post from "../posts/Post";
import User from "../user/User";
import "../posts/Post.css";

const PostList = ({ posts }) => {
  return (
    <div className="postlist">
      {posts.map(post => (
        <div className="post" key={post.id}>
          <Post post={post} />
          <User user={post.user} />
          <CommentList comments={post.comments} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
