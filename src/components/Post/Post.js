import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ userId, title, isActive, onPostSelect }) => (
  <li className="PostsList__item">
    <div>
      <b>
        [User #
        {userId}
        ]:
      </b>
      {title}
    </div>
    <button
      type="button"
      className="PostsList__button button"
      onClick={onPostSelect}
    >
      Close
    </button>
  </li>
);

Post.propTypes = {
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onPostSelect: PropTypes.func.isRequired,
};

export { Post };
