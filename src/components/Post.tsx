import React from 'react';
import { CommentList } from './CommentList';
import { User } from './User';


type Props = {
  post: PostType;
};

export const Post: React.FC<Props> = ({ post }) => (
  <li className="posts__item post">
    <div>
      <h1>
        {post.title}
      </h1>
      <p>
        {post.body}
      </p>
    </div>
    <User user={post.user} />
    <CommentList comments={post.comments} />
  </li>
);
