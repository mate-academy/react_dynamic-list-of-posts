import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Post } from './post';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ selUser, handlePostId, selectedPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getUserPosts();

      setPosts(response);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getUserPosts(selUser);

      setPosts(response);
    }

    fetchData();
  }, [selUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <Post
            post={post}
            key={post.id}
            handlePostId={handlePostId}
            selectedPostId={selectedPostId}
          />
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selUser: PropTypes.string.isRequired,
  handlePostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.string.isRequired,
};
