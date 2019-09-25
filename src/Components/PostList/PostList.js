import React from 'react';
import Post from '../Post/Post';
import { PostListProps } from '../PropTypes/PropTypes';

import './PostList.css';

const PostList = ({ posts, commentList }) => (
  <div className="post-list">
    {posts.map(({
      title, body, user, id,
    }) => (
      <Post
        title={title}
        text={body}
        user={user}
        id={id}
        key={id}
        commentList={commentList}
      />
    ))}
  </div>
);

PostList.propTypes = PostListProps;

export default PostList;
