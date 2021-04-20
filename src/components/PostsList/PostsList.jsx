import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({ userId, selectedPostId }) => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    getUserPosts(userId)
      .then(result => setPosts(result));
  }, [userId]);

  const openPostDetails = (id) => {
    selectedPostId(true, id);

    setPostId(id);
  };

  const closePostDetails = () => {
    selectedPostId(false, 0);

    setPostId(0);
  };

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
                { `[User #${post.userId}]:` }
              </b>
              {post.title}
            </div>

            {(postId !== post.id)
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => openPostDetails(post.id)}
                >
                  Open
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={closePostDetails}
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
  selectedPostId: PropTypes.func.isRequired,
};
