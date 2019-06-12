import React from 'react';
import User from "./User.js";
import CommentList from "./CommentList.js";
import "./post.css";

function Post(props) {
  return (
  <div className="post">
    <h1>
    {props.post.title}
    </h1>
  
  <p> {props.post.body} </p>
  <User user={props.user} />
  
  <p className="commentsText"> COMMENTS: </p>
  <CommentList comments={props.comments} />
  </div>
  );
}

export default Post;

