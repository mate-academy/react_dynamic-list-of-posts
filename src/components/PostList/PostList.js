import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';

const PostList = ({ posts, searchedResult }) => (
  <div className="container">
    {posts.map(
      post => (
        <Post
          searchedText={searchedResult}
          key={post.id}
          {...post}
        />
      )
    )}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchedResult: PropTypes.string.isRequired,
};

export default PostList;
