import React from 'react';
import { Post } from '../../Helpers/api';
import { UserCard } from '../UserCard/UserCard';
import { CommentList } from '../CommentList/CommentList';
import './PostCard.css';

type Props = {
  post: Post;
};

export const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className="post">
    <h1 className="post__title">{post.title}</h1>

    <div className="post__body">
      <p>&emsp;&emsp;{post.body}</p>
    </div>

    <UserCard user={post.user} />
    <CommentList comments={post.comments} />
  </div>
  );
};