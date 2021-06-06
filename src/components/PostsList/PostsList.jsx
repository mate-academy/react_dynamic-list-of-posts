import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import classNames from 'classnames';
import { getPosts, getUserPosts } from '../../api/posts';

export const PostsList = ({ selectedUser, onPostChange, selectedPostId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      getUserPosts(selectedUser).then(setPosts);
    } else {
      getPosts().then(setPosts);
    }
  }, [selectedUser]);

  const postHandler = (postId) => {
    if (postId === selectedPostId) {
      onPostChange(null);
    } else {
      onPostChange(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {!posts.length ? (
          <p>User have not post</p>
        ) : (
          posts.map(({ id, userId, title, body }) => (
            <li key={id} className="PostsList__item">
              <div>
                <b>
                  [User #$
                  {userId}
                  ]:
                  {' '}
                </b>
                {title}
              </div>
              <button
                type="button"
                className={classNames(
                  'PostsList__button button',
                  { active: id === selectedPostId },
                )}
                onClick={() => postHandler(id)}
              >
                {selectedPostId === id ? 'Close' : 'Open'}
              </button>
            </li>
          ))
        )
        }
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  selectedUser: PropTypes.number.isRequired,
  onPostChange: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
