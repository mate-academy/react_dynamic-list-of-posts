import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getAllPosts, getUserPosts } from '../../api/posts';

export const PostsList = ({ onOpen, user, isPostChosen, selectedPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user !== 0) {
      getUserPosts(user)
        .then((postsFromServer) => {
          setPosts(postsFromServer);
        });
    } else {
      getAllPosts()
        .then((postsFromServer) => {
          setPosts(postsFromServer);
        });
    }
  }, [user, selectedPost, isPostChosen]);

  const handleOpenPost = (id) => {
    onOpen(id);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User#
                {post.userId}
                ]:
              </b>
            </div>
            {post.title}
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleOpenPost(post.id)}
            >
              {(isPostChosen && selectedPost === post.id)
                ? 'Close'
                : 'Open'
              }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  onOpen: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired,
  isPostChosen: PropTypes.bool.isRequired,
  selectedPost: PropTypes.number.isRequired,
};
