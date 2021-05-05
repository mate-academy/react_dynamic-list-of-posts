import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getUserPosts, getAllPosts } from '../../api/posts';

export const PostsList = ({ selectedUserId }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');

  useEffect(() => {
    if (!selectedUserId) {
      getAllPosts()
        .then(setPosts);
    } else {
      getUserPosts(selectedUserId)
        .then(setPosts);
    }
  }, [selectedUserId]);

  const handleOpenButton = (id) => {
    setSelectedPostId(id);
  };

  const handleCloseButton = (id) => {
    setSelectedPostId('');
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostList__item"
          >
            <div>
              <b>
                {`[User #${post.userId}]`}
              </b>
              {post.title || 'No title'}
            </div>
            {post.id !== selectedPostId ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleOpenButton(post.id)}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleCloseButton('')}
              >
                Close
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
};
