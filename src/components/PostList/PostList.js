import React from 'react';
import './PostList.css';
import { PostListProps } from '../PropTypes/PropTypes';
import Post from '../Post/Post';

const PostList = ({ posts, commentList }) => (
  <div className="post-list">
    {posts.map(post => (
      <Post post={post} key={post.id} commentList={commentList} />
    ))}
  </div>
);

PostList.propTypes = PostListProps;

export default PostList;
