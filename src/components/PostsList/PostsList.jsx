import React from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ postsList, detailsToggler, currentActivePost }) => (
  <>
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {
            postsList.map(post => (
              <li
                key={uuid()}
                className="PostsList__item"
              >
                <div>
                  <b>
                    [User #
                    {post.userId}
                    ]:
                    {' '}
                  </b>
                  {post.body}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={event => detailsToggler(event, post.id)}
                >
                  {currentActivePost === post.id ? 'Close' : 'Open' }
                </button>
              </li>
            ))
          }
      </ul>
    </div>
  </>
);

PostsList.propTypes = {
  postsList: PropTypes.arrayOf({
    userId: PropTypes.number.isRequired,
  }).isRequired,
  detailsToggler: PropTypes.func.isRequired,
  currentActivePost: PropTypes.string.isRequired,
};
