import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList = React.memo(({
  currentUserId,
  currentPostId,
  changePost,
}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [currentUserId]);

  const loadPosts = async() => {
    setIsLoading(true);
    const postsFromApi = await getUserPosts(currentUserId);

    setPosts(postsFromApi);
    setIsLoading(false);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>{`[User #${post.userId}]:`}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => changePost(post.id)}
              >
                {currentPostId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

PostsList.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  currentPostId: PropTypes.number.isRequired,
  changePost: PropTypes.func.isRequired,
};
