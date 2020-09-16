import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getPosts, getUserPosts } from '../../api/posts';

export const PostsList = ({ userId, handlePostSelection }) => {
  const [posts, setPosts] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [currentPostId, setCurrentPostId] = useState('0');

  useEffect(() => {
    getPosts()
      .then(setPosts);
  }, []);

  useEffect(() => {
    getUserPosts(userId)
      .then(setPosts);
  }, [userId]);

  const handleDetailsVisibility = (postId) => {
    setDetailsVisible(!detailsVisible);
    setCurrentPostId(postId);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                handleDetailsVisibility(post.id);
                handlePostSelection(post.id, detailsVisible);
              }}
            >
              {detailsVisible && post.id === currentPostId ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.string.isRequired,
  handlePostSelection: PropTypes.func.isRequired,
};
