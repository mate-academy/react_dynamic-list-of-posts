import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getUserPosts, getAllPosts } from '../../api/posts';

export const PostsList = ({
  userId,
  showPost,
  selectedPostId,
  showPostDetails,
}) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (userId === 0) {
      getAllPosts()
        .then((posts) => {
          setUserPosts(posts);
        });
    } else {
      getUserPosts(userId)
        .then((posts) => {
          setUserPosts(posts);
        });
    }
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {userPosts.map(userPost => (
          <li key={userPost.id} className="PostsList__item">
            <div>
              <b>
                [User #
                {userPost.userId}
                ]:
                {' '}
              </b>
              {userPost.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                showPost(userPost.id);
              }}
            >
              {selectedPostId === userPost.id && showPostDetails
                ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number.isRequired,
  showPost: PropTypes.bool.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  showPostDetails: PropTypes.bool.isRequired,
};
