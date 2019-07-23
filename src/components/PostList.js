import React from 'react';
import propTypes from 'prop-types';
import Post from './Post';

const PostsList = ({ posts }) => (
  <ul
    key="post_list"
    className="post_list"
  >
    {posts.map(currentPost => (
      <Post
        key={currentPost.id}
        postData={currentPost}
      />
    ))}
  </ul>
);

PostsList.propTypes = {
  posts: propTypes.arrayOf(propTypes.object).isRequired,
};

export default PostsList;
