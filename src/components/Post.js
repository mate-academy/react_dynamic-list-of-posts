import React from 'react';
import '../App.css';
import User from "./User";
import CommentList from "./CommentList";

const Post = ({post, showComments, postItems}) => (
  <div>
    <User
      post={post}
      user={post.user}
    />

    <CommentList
      comments={post.comments}
      showComments={showComments}
      postId={post.id}
      postItems={postItems}
    />
  </div>
)

export default Post;