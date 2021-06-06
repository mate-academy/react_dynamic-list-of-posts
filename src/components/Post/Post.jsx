import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Post.scss';

export const Post = function({ post, setPostId }) {
  const [buttonStatus, setButtonStatus] = useState(false);

  const buttonStatusHandler = function() {
    setButtonStatus(state => !state);
    if (!buttonStatus) {
      setPostId(post.id);
    } else {
      setPostId(0);
    }
  };

  return (
    <>
      <div>
        <b>
          [User #
          {post.userId}
          ]:
          {' '}
        </b>
        {post.title}
      </div>
      <button
        type="button"
        className="PostsList__button button"
        onClick={buttonStatusHandler}
      >
        {buttonStatus ? (
          'Close'
        ) : (
          'Open'
        )}
      </button>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  setPostId: PropTypes.func.isRequired,
};
