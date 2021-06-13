import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';

const unknownUserId = 0;

export const PostsList = ({
  selectedUserId, onSelectPost, selectedPostId,
  isPostDetailsOpen,
}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (selectedUserId === unknownUserId) {
      getPosts()
        .then(setPosts);
    } else {
      getUserPosts(selectedUserId)
        .then(setPosts);
    }
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <>
        <h2>Posts:</h2>
        <ul className="PostsList__list">
          {posts.map(({ id, userId, title }) => (
            <li
              key={id}
              className="PostsList__item"
            >
              <div>
                <b>{`[User #${userId}]: `}</b>
                {title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => onSelectPost(id)}
              >
                {id === selectedPostId && isPostDetailsOpen
                  ? 'Close' : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.number,
  selectedPostId: PropTypes.number,
  onSelectPost: PropTypes.func.isRequired,
  isPostDetailsOpen: PropTypes.bool,
};

PostsList.defaultProps = {
  selectedUserId: 0,
  selectedPostId: 0,
  isPostDetailsOpen: false,
};
