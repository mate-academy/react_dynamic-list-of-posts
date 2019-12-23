import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

function PostList({ posts }) {
  return (
    <div className="post__item">
      {posts.map(post => <Post postData={post} key={post.id} />)}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.shape({
    post: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostList;
