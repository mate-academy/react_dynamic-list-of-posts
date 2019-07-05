import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

function PostList({ posts, filter }) {
  return (
    <div className="list">
      <input
        className="filter-field"
        placeholder="enter posts title..."
        type="text"
        onChange={filter}
      />

      {posts.map(post => (
        <Post
          post={post}
          key={post.id}
        />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.func,
};

export default PostList;
