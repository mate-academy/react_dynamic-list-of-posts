import React from 'react';
import './Post.css'
import User from './User';
import CommentList from './CommentList';

function Post(props) {
  return (
    <div key={props.title} className="post">
      <h3>{props.title}</h3>
      <p>{props.body}</p>
      <User name={props.user.name} 
            email={props.user.email} 
            address={props.user.address['city']} 
      />
      <CommentList comments={props.comments} />
    </div>
  );
}

export default Post;
