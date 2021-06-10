import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import './PostsList.scss';

import { getData } from '../../api/api';

export const PostsList = ({ selectedPostId, onSetPostId, selectedUserId }) => {
  const [posts, setPosts] = useState([]);

  const getUserPosts = async(userId) => {
    const userPost = await getData(`/posts?userId=${userId}`);

    setPosts(userPost);
  };

  const getPosts = async() => {
    const postsFromServer = await getData('/posts');

    setPosts(postsFromServer);
  };

  const selecUserPost = (idPost) => {
    if (!idPost) {
      onSetPostId(0);
    }

    onSetPostId(idPost);
  };

  useEffect(() => {
    if (selectedUserId) {
      getUserPosts(selectedUserId);
    } else {
      getPosts();
    }
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item">
            <div>
              <b>
                [User #
                {post.userId}
                ]:
              </b>
              {post.title}
            </div>
            {post.id !== selectedPostId ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => selecUserPost(post.id)}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button PostsList__button--selected button"
                onClick={() => selecUserPost(0)}
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
