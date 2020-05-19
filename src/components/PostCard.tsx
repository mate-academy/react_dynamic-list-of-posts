import React from 'react';
import { IPost } from '../helpers/interfaces';

type Props = {
  post: IPost;
};

export const PostCard: React.FC<Props> = ({ post }) => (
  <div>
    <h1>
      {post.title}
    </h1>
    <p>
      {post.body}
    </p>
  </div>
);
