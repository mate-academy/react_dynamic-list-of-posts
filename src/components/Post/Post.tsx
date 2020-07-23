import React from 'react';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import './Post.css';
import { PostProps } from '../types';

export const Post: React.FC<PostProps> = ({ post }) => {
  const title = post.title[0].toUpperCase() + post.title.substring(1);

  return (
    <div className="test">
      <div className="posts__item">
        <h2>{title}</h2>
        <p className="posts__text">{post.body}</p>
        <User user={post.user} />
      </div>
      <div className="post__comments">
        <CommentList commentList={post.commentList} />
      </div>
    </div>
  );
};
