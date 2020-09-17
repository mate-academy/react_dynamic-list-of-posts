import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Loader } from '../Loader';

import './PostsList.scss';

export const PostsList = ({
  getUserPosts,
  userSelect,
  selectedPostId,
  setSelectedPostId,
  loadPostDetails,
}) => {
  // const [chosenUser, setChosenUser] = useState(null);
  const [posts, setPosts] = useState('');
  // const [postDetailsOpen, setPostDetailsOpen] = useState(null);

  const onTogglePostDetails = (id) => {
    // setSelectedPostId(id);
    loadPostDetails(id);

    if (selectedPostId === id) {
      setSelectedPostId(null);

      return;
    }

    setSelectedPostId(id);
  };

  useEffect(() => {
    getUserPosts(userSelect)
      .then((data) => {
        // console.log(data);
        setPosts(data);
      });
  }, [userSelect]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        { (posts)
          ? posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>
                  [User
                  {post.userId}
                  ]:
                </b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => onTogglePostDetails(post.id)}
              >
                {
                  selectedPostId === post.id ? `Close` : 'Open'
                }
              </button>
            </li>
          ))
          : <Loader />
        }

      </ul>
    </div>
  );
};

PostsList.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  userSelect: PropTypes.string.isRequired,
  selectedPostId: PropTypes.number,
  loadPostDetails: PropTypes.func.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
};

PostsList.defaultProps = {
  selectedPostId: null,
};
