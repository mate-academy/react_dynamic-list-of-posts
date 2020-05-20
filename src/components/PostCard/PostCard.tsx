import React from 'react';
import { Post, User, Comment } from '../../helpers/api';
import { UserCard } from '../UserCard/UserCard';
import { CommentsList } from '../CommentsList/CommentsList';
import './PostCard.css';

type Props =  {
  post: Post;
  user: User;
  commentsList: Comment[];
}

export const PostCard: React.FC<Props> = ({ post, user, commentsList }) => (
  <li className="post-list__post post">
    <h2 className="post__title">{post.title}</h2>
    <p className="post__text">{post.body}</p>
    <UserCard user={user} />
    <CommentsList commentsList={commentsList} />
  </li>
)
