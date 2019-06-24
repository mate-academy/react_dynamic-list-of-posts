import React from 'react';
import CommentList from './CommentList.js';
import User from './User.js';

function Post(props) {
  return (
    <article>
      <h4>Title: {props.post.title}</h4>
      <h5><User user={props.user}/></h5>
      <p>{props.post.body}</p>
      <CommentList comments={props.comments}/>
    </article>
  );
}

export default Post;
