import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ userId, selectedPostId, onPostSelect }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const response = await getUserPosts(userId);

      setPosts(response);
    };

    fetchData();
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User #
                {post.userId}
                ]:&nbsp;
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                selectedPostId === post.id
                  ? onPostSelect('')
                  : onPostSelect(post.id);
              }}
            >
              {selectedPostId === post.id ? 'Hide' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  onPostSelect: PropTypes.func.isRequired,
};
