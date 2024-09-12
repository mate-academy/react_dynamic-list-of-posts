import React from 'react';
import User from "./User";
import CommentList from "./CommentList";

function Post(props) {
  return (
    <li>
      <p className="title">{props.title}</p>
      <User users={props.userList} userId={props.userId}/>
      <p className="text">{props.text}</p>
      <CommentList comments={props.comments} postId={props.post}/>
    </li>
  )
}

export default Post;
