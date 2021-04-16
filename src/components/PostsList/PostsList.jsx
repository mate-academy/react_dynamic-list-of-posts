import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ userId, setPostId }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const getPosts = async() => {
    const response = await getUserPosts(userId);

    setPosts(response);
  };

  useEffect(() => {
    getPosts();
  }, [posts, userId]);

  const handleCloseButton = () => {
    setSelectedPostId('');
  };

  const handleOpenButton = (id) => {
    setSelectedPostId(id);
    setPostId(id);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}]: `}
              </b>
              {post.title}
            </div>
            {post.id !== selectedPostId
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => handleOpenButton(post.id)}
                >
                  Open
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={handleCloseButton}
                >
                  Close
                </button>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
};
