import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Post } from './post';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ selectedUser, handlePostId, selectedPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getUserPosts(selectedUser);

      setPosts(response);
    }

    fetchData();
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <Post
            post={post}
            key={post.id}
            handlePostId={handlePostId}
            isOpen={+selectedPostId === post.id }
          />
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  handlePostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.string.isRequired,
};
