import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ listPosts, selectedPostId, setPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {listPosts.map(post => (
        <li className="PostsList__item" key={post.id} meta-key={post.id}>
          <div>
            <b>
              [User #`$
              {post.userId}
              `]:
              {' '}
            </b>
            {post.title}
          </div>
          {selectedPostId === post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                setPostId();
              }}
            >
              Close
            </button>
          )
            : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setPostId(post.id);
                }}
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

PostsList.propTypes = {
  listPosts: PropTypes.arrayOf.isRequired,
  selectedPostId: PropTypes.string.isRequired,
  setPostId: PropTypes.func.isRequired,
};
