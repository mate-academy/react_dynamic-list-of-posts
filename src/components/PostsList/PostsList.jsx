import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import './PostsList.scss';

import { getUserPosts, getPosts } from '../../api/posts';

export const PostsList = ({ selectedPostId, onSetPostId, selectedUserId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (selectedUserId) {
      getUserPosts(selectedUserId)
        .then(setPosts);
    } else {
      getPosts()
        .then(setPosts);
    }
  }, [selectedUserId]);

  const selectUserPost = (idPost) => {
    if (!idPost) {
      onSetPostId(0);
    }

    onSetPostId(idPost);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.title}
            </div>
            {post.id !== selectedPostId ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => selectUserPost(post.id)}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button PostsList__button--selected button"
                onClick={() => selectUserPost(0)}
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
  selectedPostId: PropTypes.number.isRequired,
  onSetPostId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
