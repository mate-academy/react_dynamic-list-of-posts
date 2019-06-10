import React from 'react'
import User from './User';
import Comment from './Comment';

function Post(props) {
  const { post } = props;

  return (
    <section>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <User user={post.user}/>
      {post.comments.map(comment => <Comment comment={comment} key={comment.id}/>)}
    </section>
  );
}

export default Post;
