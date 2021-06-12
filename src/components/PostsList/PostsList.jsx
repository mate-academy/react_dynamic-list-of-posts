import React from 'react';
import PropTypes from 'prop-types';
import { TypePost } from '../../types';

import './PostsList.scss';
import '../pressed-button.scss';

export const PostsList = ({ posts, setId, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts !== null && (
        posts.map(({ id, title, userId }) => (
          <li className="PostsList__item" key={id}>
            <div>
              <b>
                [
                {`User #${userId}`}
                ]:
                {' '}
              </b>
              {title}
            </div>

            {selectedPostId === id ? (
              <button
                type="button"
                className="PostsList__button button pressed-button"
                onClick={() => setId(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => setId(id)}
              >
                Open
              </button>
            )}
          </li>
        ))
      )}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(TypePost),
  setId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
};

PostsList.defaultProps = {
  posts: [],
};
