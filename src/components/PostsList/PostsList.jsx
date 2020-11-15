import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

import { Loader } from '../Loader';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({ selectedUserId, selectedPostId, selectPost }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = async() => {
    const loadedPosts = await getUserPosts(selectedUserId);

    setPosts(loadedPosts);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {isLoading
        ? (
          <Loader />
        )
        : (
          <ul>
            {posts.map(post => (
              <li
                key={post.id}
                className="PostsList__item"
              >
                <div>
                  <b>{`[User #${post.userId}]:`}</b>
                  {post.title}
                </div>

                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => selectPost(post.id)}
                >
                  {selectedPostId === post.id
                    ? 'Close'
                    : 'Open'
                  }
                </button>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  selectPost: PropTypes.func.isRequired,
};
