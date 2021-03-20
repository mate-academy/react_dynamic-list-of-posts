import React from 'react';
import PropTypes from 'prop-types';

export function Post({
  title,
  userId,
  onChangeUserId,
  selectedPostId,
  onResetUserId,
  id,

}) {
  return (
    <li className="PostsList__item">
      <div>
        <b>{`[User #${userId}]: `}</b>
        {title}
      </div>
      <button
        hidden={id === selectedPostId}
        type="button"
        className="PostsList__button button hidden"
        onClick={() => onChangeUserId(id)}
      >
        Open
      </button>
      <button
        hidden={id !== selectedPostId}
        type="button"
        className="PostsList__button button"
        onClick={onResetUserId}
      >
        Close
      </button>
    </li>
  );
}

Post.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
  title: PropTypes.string,
  userId: PropTypes.number,
  onChangeUserId: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  onResetUserId: PropTypes.func.isRequired,
};

Post.defaultProps = {
  title: '',
  userId: null,
};
