import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts, getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({
  userId,
  postId,
  setPostId,
}) => {
  const [posts, setPosts] = useState([]);

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
    setPostId(id);
  };

  const closePost = () => {
    setPostId('');
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

            {postId !== post.id ? (
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
                onClick={closePost}
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
  postId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
};
