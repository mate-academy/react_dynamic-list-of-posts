import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({
  selectedPostId,
  setSelectedPostId,
  selectedUserId,
}) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async() => {
    const response = await getUserPosts();

    if (selectedUserId === 0) {
      setPosts(response);
    } else {
      const filerPosts = response
        .filter(post => post.userId === selectedUserId);

      setPosts(filerPosts);
    }
  };

  useEffect(() => {
    getPosts();
  }, [selectedUserId]);

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
            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setSelectedPostId(null);
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setSelectedPostId(post.id);
                }}
              >
                Open
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
  setSelectedPostId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
