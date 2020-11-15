import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';
import { getPosts } from '../../api/posts';
import { Loader } from '../Loader';

export const PostsList = (
  {
    selectedUserId,
    setSelectedPostId,
    selectedPostId,
  },
) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const loadPosts = async(userId) => {
      try {
        setLoading(true);

        const postsFromServer = await getPosts(userId);

        setLoading(false);
        setPosts(postsFromServer);
      } catch (e) {
        setLoading(false);
        setError(`${e}`);
      }
    };

    loadPosts(selectedUserId);
  }, [selectedUserId]);

  const choosePost = (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
    }
  };

  if (error) {
    return (
      <div className="PostsList">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {isLoading
        ? <Loader />
        : (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li key={post.id} className="PostsList__item">
                <div>
                  <b>{`[User #${post.userId}]: `}</b>
                  {post.title}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => choosePost(post.id)}
                >
                  {selectedPostId === post.id ? 'Close' : 'Open'}
                </button>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

PostsList.propTypes = {
  selectedUserId: PropTypes.string.isRequired,
  selectedPostId: PropTypes.number,
  setSelectedPostId: PropTypes.func.isRequired,
};

PostsList.defaultProps = {
  selectedPostId: '',
};
