import React from 'react';
import { Post } from './helpers/api';
import { Comments } from './Comments';

type Props = {
  post: Post;
};

export const PostList: React.FC<Props> = ({ post }) => (
  <div className="post">
    <h3 className="post__title">{post.title}</h3>
    <p className="post__text">{post.body}</p>
    <div className="user">
      <p className="user__name">{post.user?.name}</p>
    </div>

    {post.comments && (
      <Comments comments={post.comments} />
    )}
  </div>
);
