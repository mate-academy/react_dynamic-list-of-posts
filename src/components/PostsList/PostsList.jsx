import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

import { getUserPosts } from '../../api/posts';

export const PostsList = ({ selectedUser, selectedPostId, handlePost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async() => {
      const postsFromServer = await getUserPosts(selectedUser);

      setPosts(postsFromServer);
    };

    getPosts();
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>
                [User
                {post.userId}
                ]:
                {' '}
              </b>
              <p>{post.title}</p>
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                handlePost(post.id);
              }}
            >
              {post.id === selectedPostId ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  handlePost: PropTypes.func.isRequired,
};
