import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GetUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({
  userId,
  selectedPostId,
  setSelectedPostId,
  setLoading,
}) => {
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    GetUserPosts(userId)
      .then(updatePosts);
  }, [userId]);
  // console.log(loading)

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]
              </b>
              Post text:
              {' '}
              {post.title}

            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                selectedPostId === post.id
                  ? setSelectedPostId(null)
                  : setSelectedPostId(post.id);
                setLoading(true);
              }
              }
            >
              {selectedPostId === post.id
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
  userId: PropTypes.number.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
