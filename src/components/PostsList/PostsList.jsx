import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import propTypes from 'prop-types';
import { getUserPosts } from '../../api/posts';

export const PostsList = ({
  currentUser,
  selectedPostId,
  setSelectedPostId,
}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(currentUser).then(setPosts);
  }, [currentUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {
          posts.map(({ id, userId, title }) => (
            <li
              className="PostsList__item"
              key={id}
            >
              <div>
                <b>
                  {`[User #${userId}]:`}
                </b>
                {title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  if (selectedPostId === id) {
                    setSelectedPostId(0);

                    return;
                  }

                  setSelectedPostId(id);
                }}
              >
                {(selectedPostId === id) ? 'Close' : 'Open'}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  currentUser: propTypes.number.isRequired,
  selectedPostId: propTypes.number.isRequired,
  setSelectedPostId: propTypes.func.isRequired,
};
