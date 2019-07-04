import React from 'react';
import User from './User';
import CommentList from "./CommentList";
import './Post.css';

const Post = ({ title, body, user, comments }) => (
  <article className="post">
    <h2 className="post__title">{title}</h2>
    <p>{body}</p>
    <User {...user} />
    <CommentList comments={comments} />
  </article>
);

export default Post;
