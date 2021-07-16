/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getPosts } from '../../api/api';

export const PostsList = ({
  selectedUserId,
  setSelectedPostId,
  selectedPostId,
}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(selectedUserId).then(movies => setPosts(movies));
  }, [selectedUserId]);

  const openPost = (postId) => {
    return selectedPostId === postId
      ? setSelectedPostId(0)
      : setSelectedPostId(postId);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0
        && posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User #
                {post.userId}
                ]:
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => openPost(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
