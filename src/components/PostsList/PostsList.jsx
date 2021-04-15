import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';
import { getPosts, getUserPosts, createComment } from '../../api/posts';

//createComment();

export const PostsList = ({
  userId,
  onOpen,
  onClose,
  selectedId,
}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!userId) {
      getPosts()
        .then(setPosts);
    } else {
      getUserPosts(userId)
        .then(setPosts);
    }
  }, [userId]);

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
                ]: &nbsp;
              </b>
              {post.title || 'No title'}
            </div>

            {post.id === selectedId
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={onClose}
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => onOpen(post.id)}
                >
                  Open
                </button>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.defaultProps = {
  selectedId: null,
  userId: null,
};

PostsList.propTypes = {
  userId: PropTypes.number,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedId: PropTypes.number,
};
