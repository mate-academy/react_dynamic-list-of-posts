import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts, getPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({
  selectedUserId,
  setPostId,
  setPostOpen,
}) => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');

  useEffect(() => {
    if (!selectedUserId) {
      getPosts().then(setPosts);
    } else {
      getUserPosts(selectedUserId).then(setPosts);
    }
  }, [selectedUserId]);

  const handleOpenButton = (id) => {
    setPostOpen(true);
    setSelectedPostId(id);
    setPostId(id);
  };

  const handleCloseButton = () => {
    setPostOpen(false);
    setSelectedPostId('');
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(({ id, userId, title }) => (
          <li className="PostsList__item" key={id}>
            <div>
              <b>
                [User #
                {userId}
                ]:
              </b>
              {title || 'No title'}
            </div>
            {selectedPostId !== id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleOpenButton(id)}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button button--active"
                onClick={handleCloseButton}
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
  setPostId: PropTypes.func.isRequired,
  setPostOpen: PropTypes.func.isRequired,
};
