import React from 'react';
import Post from '../Post/Post';
import './PostList.css';
import { Posts } from '../../helpers/api';

interface List {
  list: Posts[];
}

const PostList: React.FC<List> = ({ list }) => (
  <div key="PostList" className="post list">
    {list.map(post => (
      <Post key={post.id} {...post} />
    ))}
  </div>
);

export default PostList;
