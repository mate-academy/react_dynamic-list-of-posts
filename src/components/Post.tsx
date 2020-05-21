import React from 'react';
import User from './User';
import CommentList from './CommentList';
import { PostWithUser } from '../api';

type Props = {
  post: PostWithUser;
};

const Post: React.FC<Props> = ({ post }) => (
  <li className="posts__post post">
    <h1 className="post__title">{post.title}</h1>
    <p className="post__body">{post.body}</p>
    <User user={post.user} />
    <CommentList comments={post.comments} />
  </li>
);

export default Post;
