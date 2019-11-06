import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post';

function PostList({ posts }) {
  return (
    <ul className="list">
      {posts.map(post => <Post post={post} key={post.id} />)}
    </ul>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      adress: PropTypes.shape({
        street: PropTypes.string.isRequired,
        suite: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
      }),
    }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      postID: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })),
  }).isRequired).isRequired,
};

export default PostList;
