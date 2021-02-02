import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({ userId, getSelectedPostId, postId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(userId)
      .then(setPosts);
  }, [userId]);

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
                User:
                {post.userId}
              </b>
              <br />
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                postId === post.id
                  ? getSelectedPostId(0)
                  : getSelectedPostId(post.id);
              }}
            >
              {postId !== post.id ? 'Open' : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.digit,
  getSelectedPostId: PropTypes.func,
  postId: PropTypes.digit,
}.isRequired;
