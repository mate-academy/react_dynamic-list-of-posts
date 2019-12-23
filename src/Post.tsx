import React from 'react';
import User from './User';
import CommentList from './CommentList';
import { NormalizedPostInterface } from './interfaces';

interface Props {
  post: NormalizedPostInterface;
}

const Post: React.FC<Props> = ({ post }) => (
  <article className="post__item">
    <h2 className="post__title">{post.title}</h2>
    <p className="post__text">{post.body}</p>
    <User user={post.user} />
    <CommentList comments={post.comments} />
  </article>
);

export default Post;
