import React from 'react';
import { User, Post, Comment } from './Interfaces';
import { CommentList } from './CommentList';
import { UserItem } from './UserItem';

interface Props {
  comments: Comment[];
  user: User;
  post: Post;
}

export const PostItem: React.FC<Props> = ({ comments, user, post }) => (
  <li className="post">
    <h1>
      {post.title}
    </h1>
    <p>
      {post.body}
    </p>
    <UserItem user={user} />
    <CommentList comments={comments} />
  </li>
);
