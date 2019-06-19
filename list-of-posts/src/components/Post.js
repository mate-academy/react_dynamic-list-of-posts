import React from 'react';
import User from "./User";
import CommentList from "./CommentList";

function Post(props) {
  return (
    <li>
      <h3>Title</h3>
      <p>{props.title}</p>
      <h3>Text</h3>
      <p>{props.text}</p>
      <User users={props.userList} userId={props.userId}/>
      <CommentList comments={props.comments} postId={props.post}/>
    </li>
  )
}

export default Post;
