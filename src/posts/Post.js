import React from "react";
import "../posts/Post.css";

const Post = ({ post }) => {
  return (
    <>
      <h2 className="bottom-line">{post.title}</h2>
      <p className="bottom-line">{post.body}</p>
    </>
  );
};

export default Post;
