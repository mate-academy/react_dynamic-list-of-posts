import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

import { getUserPosts } from '../../api/posts';

export const PostsList = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(userId)
      .then(postsFromServer => (
        setPosts(postsFromServer)
      ));
  }, []);

  useEffect(() => {
    getUserPosts(userId).then(postsFromServer => (
      setPosts(postsFromServer)
    ));
  }, [userId]);

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
            >
              Open
            </button>
          </li>
        ))}

        {/* <li className="PostsList__item">
          <div>
            <b>[User #2]: </b>
            et ea vero quia laudantium autem
          </div>

          <button
            type="button"
            className="PostsList__button button"
          >
            Close
          </button>
        </li> */}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.string.isRequired,
};
