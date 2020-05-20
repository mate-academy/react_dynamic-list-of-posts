import React from 'react';
import { User } from './User';
import { CommentList } from './CommentList';
import { PostWithUser } from '../helpers/typeDefs';

type Props ={
  post: PostWithUser;
};

export const Post: React.FC<Props> = ({ post }) => (
  <div className="post">
    <h2>{post.title}</h2>
    <p>{post.body}</p>
    <User {...post.user} />
    <CommentList comments={post.comments} />
  </div>
);
