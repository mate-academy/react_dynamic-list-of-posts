import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ selectedUser, getPost, selectedPost = {} }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(+selectedUser)
      .then(setPosts);
  }, [selectedUser, selectedPost]);

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
                {' '}
              </b>
              {post.title}
            </div>

            {!(selectedPost.id === post.id) ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  getPost(post);
                }}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  getPost({});
                }}
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
  selectedUser: PropTypes.string.isRequired,
  getPost: PropTypes.func.isRequired,
  selectedPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
