import React from 'react';
import { Post } from '../../helpers/api';
import { UserCard } from '../UserCard/UserCard';
import { CommentsList } from '../CommentsList/CommentsList';
import './PostCard.css';

type Props =  {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => (
  <li className="post-list__post post">
    <h2 className="post__title">{post.title}</h2>
    <p className="post__text">{post.body}</p>
    {post.user && <UserCard {...post.user} />}
    {post.comments && <CommentsList commentsList={post.comments} />}
  </li>
)
