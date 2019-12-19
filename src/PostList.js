import PropTypes from 'prop-types';
import React from 'react';
import Post from './Post';

const PostList = ({ posts, highlight }) => (
  <dl>
    {posts.map(currentPost => (
      <Post
        post={currentPost}
        key={currentPost.id}
        highlightedPart={highlight}
      />
    ))}
  </dl>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  highlight: PropTypes.string.isRequired,
};

export default PostList;
