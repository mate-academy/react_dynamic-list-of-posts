import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

import { Post } from '../Post/Post';

import { getUserPosts, getAllPosts } from '../../api/posts';

export const PostsList = ({ selectedUserId, setPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (Number(selectedUserId)) {
      getUserPosts(selectedUserId)
        .then((response) => {
          setPosts(response);
        });
    } else {
      (
        getAllPosts()
          .then((response) => {
            setPosts(response);
          })
      );
    }
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <Post post={post} setPostId={setPostId} />
          </li>
        ))}
      </ul>

    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.string.isRequired,
  setPostId: PropTypes.func.isRequired,
};
