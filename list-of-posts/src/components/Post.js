import React from 'react'
import User from './User';
import CommentList from './CommentList';

export default function Post(props){
    const user = props.post.users;
    const comments = props.post.comments;
    return <div >
        <h1 key={props.key}>Title: {props.post.title} </h1>
        <p>{props.post.body}</p>
        <User
          user={user} />
        <CommentList comments={comments} />
      </div>
};
