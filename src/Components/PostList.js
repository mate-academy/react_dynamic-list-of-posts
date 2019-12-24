import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const PostList = ({ posts, result }) => (
  <div>
    {posts.map(
      post => (
        <Post
          bolderText={result}
          key={post.id}
          {...post}
        />
      )
    )}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  result: PropTypes.string,
}.isRequired;

export default PostList;
