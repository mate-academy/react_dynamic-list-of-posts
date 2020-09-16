import React from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

export const PostsList = ({
  posts,
  selectedPostId,
  setSelectedPostId,
  toggleDetail,
  setToggleDetail,
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
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => {
              setSelectedPostId(post.id);
              if (selectedPostId === post.id) {
                setToggleDetail(!toggleDetail);
              } else {
                setToggleDetail(true);
              }
            }}
          >
            {(selectedPostId === post.id && toggleDetail) ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  selectedPostId: PropTypes.number,
  setSelectedPostId: PropTypes.func.isRequired,
  toggleDetail: PropTypes.bool.isRequired,
  setToggleDetail: PropTypes.func.isRequired,
};

PostsList.defaultProps = {
  selectedPostId: null,
};
