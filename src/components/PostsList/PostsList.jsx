import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ selectedUser, setSelectedPost, selectedPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(selectedUser).then(setPosts);
  }
  , [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
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
              value={post.id}
              onClick={e => setSelectedPost(+e.target.value)}
            >
              {selectedPost === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedPost: PropTypes.number.isRequired,
  selectedUser: PropTypes.number.isRequired,
  setSelectedPost: PropTypes.func.isRequired,
};
