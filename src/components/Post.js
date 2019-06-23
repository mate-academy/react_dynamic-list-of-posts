import React from 'react';
import User from './User';
import '../css/Post.css'
import CommentList from './CommentList';

function Post(props) {
  return (
    <section className='post'>
      <h2>{props.item.title}</h2>
      <p>{props.item.body}</p>
      <User user={props.item.user} />
      <CommentList comments={props.item.comments} />
    </section>
  );
}

export default Post;
