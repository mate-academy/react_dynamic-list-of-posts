import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

// import comments from '../api/comments';

const PostList = ({ posts }) => (
  <div className="post-list-wrapper">
    {posts.map(post => (
      <Post
        post={post}
        key={post.id}
      />
    ))}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
