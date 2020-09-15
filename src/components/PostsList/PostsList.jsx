import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({
  posts,
  onPostSelection,
  selectedPostId,
  onPostClosing,
}) => (
  <div className="PostsList">
    <h2>{`Posts:${posts.length}`}</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          className="PostsList__item"
          key={post.id}
        >
          <div>
            <b>
              {`[User #${post.userId}]:`}
            </b>
            {post.title}
          </div>
          {post.id !== selectedPostId && (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                onPostSelection(post.id);
              }}
            >
              Open
            </button>
          )}

          {post.id === selectedPostId && (
            <button
              type="button"
              className="PostsList__button button"
              onClick={onPostClosing}
            >
              Close
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);

PostsList.defaultProps = {
  posts: [],
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)),
  onPostSelection: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number.isRequired,
  onPostClosing: PropTypes.func.isRequired,
};
