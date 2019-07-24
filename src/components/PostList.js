import React from 'react';
import PropTypes from 'prop-types';
import Posts from './Posts';

function PostList({ currentPosts }) {
  return (
    <div>
      {currentPosts.map(post => (
        <Posts
          key={post.id}
          posts={post}
        />
      ))}
    </div>
  );
}

PostList.propTypes = {
  currentPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default PostList;
