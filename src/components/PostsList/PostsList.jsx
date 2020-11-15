import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import { Posts } from '../Posts';
import './PostsList.scss';

export const PostsList = ({ selectedUser, setPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(selectedUser)
      .then((post) => {
        setPosts(post);
      });
  }, [selectedUser, setPosts]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <Posts
            key={post.id}
            title={post.title}
            userId={post.userId}
            id={post.id}
            setPost={setPost}
          />
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  setPost: PropTypes.func.isRequired,
};
