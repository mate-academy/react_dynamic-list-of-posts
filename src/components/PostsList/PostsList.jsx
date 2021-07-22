import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPostsUser } from '../../api/posts';
import { Loader } from '../Loader';
import './PostsList.scss';

export const PostsList = ({ userId, selectedPostId, setPostId }) => {
  const [posts, setPosts] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadData = async() => {
      await getPostsUser(userId)
        .then((response) => {
          setPosts(response);
        });

      setLoading(false);
    };

    loadData();
  }, [userId]);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts && posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>[User #{userId}]:</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if (selectedPostId === post.id) {
                  return setPostId(0);
                }

                setPostId(post.id);
              }}
            >
              {selectedPostId === post.id ? 'close' : 'open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.string.isRequired,
  selectedPostId: PropTypes.string.isRequired,
  setPostId: PropTypes.func.isRequired,
};
