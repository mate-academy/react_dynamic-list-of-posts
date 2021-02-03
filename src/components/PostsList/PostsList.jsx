import React from 'react';
import PropTypes from 'prop-types';

import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader/Loader';
import './PostsList.scss';

export const PostsList = ({ setPostID, postID, posts }) => (

  !posts.length
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
    )
);

PostsList.propTypes = {
  setPostID: PropTypes.func.isRequired,
  postID: PropTypes.number,
  posts: PropTypes.arrayOf(PropTypes.object),
};

PostsList.defaultProps = {
  posts: [],
  postID: PropTypes.number,
};
