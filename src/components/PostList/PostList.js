import React from 'react';
import './PostList.css';
import PropTypes from 'prop-types';
import Post from '../Post/Post';

function PostList({ posts, comments }) {
  return (
    <div className="post-list">
      {posts.map(item => (
        <Post post={item} comments={comments} user={item.user} key={item.id} />
      ))}
    </div>
  );
}

Post.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
    })
  ),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string,
    })
  ),
};

export default PostList;
