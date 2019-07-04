import React from 'react';
import '../App.css';
import User from "./User";
import CommentList from "./CommentList";

const Post = ({post, postItems}) => (
  <div>
    <User
      post={post}
      user={post.user}
    />

    <CommentList
      comments={post.comments}
      postId={post.id}
      postItems={postItems}
    />
  </div>
)

export default Post;