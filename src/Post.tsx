import React from 'react';
import User from './User';
import CommentList from './CommentList';
import { NormalizedPost } from './interfaces';

interface PostProps {
  post: NormalizedPost;
}

const Post: React.FC<PostProps> = ({ post }) => (
  <article className="post__item">
    <h2 className="post__title">{post.title}</h2>
    <p className="post__text">{post.body}</p>
    <User user={post.user} />
    <CommentList comments={post.comments} />
  </article>
);

export default Post;
