import React from 'react';
import PropTypes from 'prop-types';
import { PostType } from '../../types';
import './PostsList.scss';

export const PostsList = ({
  posts,
  selectedPostId,
  setSelectedPostId,
}) => (
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
              [User #
              {post.userId}
              ]:
            </b>
            {post.body}
          </div>
          {selectedPostId === post.id
            ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setSelectedPostId(null);
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
                  setSelectedPostId(post.id);
                }}
              >
                Open
              </button>
            )}
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PostType.isRequired).isRequired,
  selectedPostId: PropTypes.number.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
};
