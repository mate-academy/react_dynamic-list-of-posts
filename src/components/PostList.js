import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const PostList = ({ posts, highlightedSearchResult }) => (
  <div className="posts-container">
    {posts.map(
      post => (
        <Post
          highlightedText={highlightedSearchResult}
          key={post.id}
          {...post}
        />
      )
    )}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  highlightedSearchResult: PropTypes.string.isRequired,
};

export default PostList;
