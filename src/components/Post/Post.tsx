import React from 'react';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import './Post.css';

export const Post: React.FC<Post> = ({
  title, body, user, comments,
}) => (
  <div className="posts__item">
    <h3 className="posts__title">{title}</h3>
    <p className="posts__text">{body}</p>
    <User {...user} />
    <CommentList comments={comments} />
  </div>
);
