import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, onSelectedPost, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {
        posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            {
              selectedPostId === post.id
                ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => onSelectedPost(0)}
                  >
                    Close
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => onSelectedPost(post.id)}
                  >
                    Open
                  </button>
                )
            }
          </li>
        ))
      }
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  onSelectedPost: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};
