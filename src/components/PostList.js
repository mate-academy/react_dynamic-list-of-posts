import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';

const PostList = ({ postsList }) => (
  <main className="posts-box">
    {postsList.map(post => (
      <Post question={post} key={post.id} />
    ))}
  </main>
);

PostList.propTypes = {
  postsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
