import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Post } from '../Post';
import './PostsList.scss';

import { Loader } from '../Loader';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({ selectedUserId, selectedPostId, selectPost }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async() => {
      const loadedPosts = await getUserPosts(selectedUserId);

      setPosts(loadedPosts);
      setIsLoading(false);
    };

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
                <Post
                  {...post}
                  selectedPostId={selectedPostId}
                  handleClick={selectPost}
                />
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  selectPost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
