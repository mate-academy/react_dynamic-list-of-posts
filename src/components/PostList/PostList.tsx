import React from 'react';
import PostItem from '../Post/Post';
import './PostList.css';
import { Post } from '../../helpers/api';

interface List {
  list: Post[];
}

const PostList: React.FC<List> = ({ list }) => (
  <div key="PostList" className="post list">
    {list.map(post => (
      <PostItem key={post.id} {...post} />
    ))}
  </div>
);

export default PostList;
