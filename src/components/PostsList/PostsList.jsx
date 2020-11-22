import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = (
  { selectedUser, selectedPostId, setSelectedPostId },
) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(selectedUser).then(setPosts);
  }, [selectedUser]);

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
              <b>{`[User ${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                selectedPostId === post.id
                  ? setSelectedPostId(null)
                  : setSelectedPostId(post.id);
              }}
            >
              {
                selectedPostId === post.id
                  ? 'Close'
                  : 'Open'
              }
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUser: PropTypes.number,
  selectedPostId: PropTypes.number,
  setSelectedPostId: PropTypes.func.isRequired,
};

PostsList.defaultProps = {
  selectedUser: null,
  selectedPostId: null,
};
