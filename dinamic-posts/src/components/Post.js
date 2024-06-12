import React from 'react';
import User from './User';
import CommentList from './CommentList';

function Post(props) {
  const { title, body, user, postComments } = props;
  return (
    <div>
      <h2>{title}</h2>
      <span>{body}</span>
      <User {...user}/>
      <CommentList postComments={postComments} />
      <hr/>
    </div>
  );
}

export default Post;
