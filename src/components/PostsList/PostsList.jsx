import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getPosts, getUserPosts } from '../../api/posts';

const UNKNOWN_USER_ID = 0;

export const PostsList = ({
  selectedUserId, onSelectPost, selectedPostId,
  isPostDetailsOpen,
}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (selectedUserId === UNKNOWN_USER_ID) {
      getPosts()
        .then(setPosts);
    } else {
      getUserPosts(selectedUserId)
        .then(setPosts);
    }
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      {posts.length === 0 ? (
        <h2>No Posts Available</h2>
      ) : (
        <>
          <h2>Posts:</h2>
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.title}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => onSelectPost(post.id)}
                >
                  {post.id === selectedPostId && isPostDetailsOpen
                    ? 'Close' : 'Open'}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
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
