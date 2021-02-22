import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList = ({ userId, setSelectedPostId, selectedPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const postsFromServer = await getUserPosts(userId);

      setPosts(postsFromServer);
    }

    fetchPosts();
  }, [userId]);

  const handleClick = (postId) => {
    setSelectedPostId(postId === selectedPostId ? undefined : postId);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {posts.length ? (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handleClick(post.id)}
              >
                {`${selectedPostId === post.id ? 'Close' : 'Open'}`}
              </button>
            </li>
          ))}
        </ul>
      ) : <Loader />}
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number,
  selectedPostId: PropTypes.number,
  setSelectedPostId: PropTypes.func.isRequired,
};

PostsList.defaultProps = {
  selectedPostId: undefined,
  userId: undefined,
};
