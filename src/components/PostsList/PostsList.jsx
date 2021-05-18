import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({
  userId,
  setPostId,
  setPostOpen,
}) => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');

  useEffect(() => {
    if (!userId) {
      getPosts()
        .then(setPosts);
    } else {
      getUserPosts(userId)
        .then(setPosts);
    }
  }, [userId]);

  const openPost = (id) => {
    setSelectedPostId(id);
    setPostId(id);
    setPostOpen(id);
  };

  const closePost = () => {
    setSelectedPostId('');
    setPostOpen(false);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User
                {post.name}
                ]:
                {' '}
              </b>
              {post.body}
            </div>

            {selectedPostId !== post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => openPost(post.id)}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button button--active"
                onClick={() => closePost()}
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
  userId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
  setPostOpen: PropTypes.func.isRequired,
};
