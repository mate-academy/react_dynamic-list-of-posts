import React, { FC } from 'react';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import './Post.css';

interface Props {
  post: PostWithComments;
}

export const Post: FC<Props> = ({ post }) => {
  return (
    <div className="post">
      <User person={post.user} />
      <h2 className="post__heading">{post.title}</h2>
      <p className="post__text">{post.body}</p>
      <CommentList comments={post.comments} />
    </div>
  );
};
