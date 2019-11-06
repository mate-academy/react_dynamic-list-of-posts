import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';
import './PostList.css';

function PostList(props) {
  const { posts } = props;

  return (
    <ul className="post-list">
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </ul>
  );
}

PostList.defaultProps = {
  posts: [],
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

export default PostList;
