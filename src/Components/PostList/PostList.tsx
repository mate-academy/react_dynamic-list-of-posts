import React, { FC } from 'react';
import { PostListInterface } from '../../interfaces';
import { Post } from '../Post/Post';
import './PostList.css';

interface PostListProps {
  postList: PostListInterface[];
}

export const PostList: FC<PostListProps> = ({ postList }) => (
  <ul className="list-group">
    {postList.map(post => (
      <li key={post.id} className="post__item">
        <Post post={post} />
      </li>
    ))}
  </ul>
);
