import React from 'react';
import './App.css';
import Post from "./Post.js";

function PostList(props) {
  return props.posts.map((value) => {
    let userIndex = props.users.findIndex(user => user.id === value.userId);
    let comments = props.comments.filter(comment => comment.postId === value.id);
  
    return <Post key={value.id} post={value} user={props.users[userIndex]} comments={comments}/>
  });
}

export default PostList;
