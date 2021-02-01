import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getUserPosts, getPostDetails } from '../../api/posts';
import { Loader } from '../Loader/Loader';
import './PostsList.scss';

export const PostsList = ({ userID, setPostID, postID, posts, setPosts }) => {
  useEffect(() => {
    getUserPosts(userID).then(result => setPosts(result));
  }, [userID, postID, setPosts]);

  return !posts.length
    ? <Loader />
    : (
      <div className="PostsList">
        <h2>Posts:</h2>
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {post.id === postID ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setPostID('')}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  getPostDetails(post.id);
                  setPostID(post.id);
                }}
              >
                Open
              </button>
            )}

          </li>
        ))}
      </div>
    );
};

PostsList.propTypes = {
  userID: PropTypes.number.isRequired,
  setPostID: PropTypes.func.isRequired,
  setPosts: PropTypes.func.isRequired,
  // postID: PropTypes.func, // ??? почему это функция???
  postID: PropTypes.number,
  posts: PropTypes.arrayOf(PropTypes.object),
};

PostsList.defaultProps = {
  posts: [],
  postID: PropTypes.number,
};
