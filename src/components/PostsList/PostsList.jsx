import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';
import { getAllPosts, getUserPosts } from '../../api/posts';

export const PostsList = ({
  selectedUser,
  selectedPostId,
  setSelectedPostId,
}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (selectedUser > 0) {
      getUserPosts(selectedUser)
        .then(setPosts);
    } else {
      getAllPosts()
        .then(response => setPosts(response.filter(post => post.userId)));
    }
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if (selectedPostId !== post.id) {
                  setSelectedPostId(post.id);
                } else {
                  setSelectedPostId('');
                }
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

PostsList.defaultProps = {
  selectedPostId: '',
};

PostsList.propTypes = {
  selectedUser: PropTypes.number.isRequired,
  selectedPostId: PropTypes.number,
  setSelectedPostId: PropTypes.func.isRequired,
};
