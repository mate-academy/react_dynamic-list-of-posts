import React from 'react';
import PropTypes from 'prop-types';

export function Post({
  title,
  userId,
  selectedUserId,
  id,
  selectedPost,
  resetUser,
}) {
  return (
    <li>
      <div>
        <b>{`User #${userId}:`}</b>
        {title}
      </div>
      <button
        hidden={id === selectedPost}
        type="button"
        className="PostsList__button button hidden"
        onClick={() => selectedUserId(id)}
      >
        Open
      </button>
      <button
        type="button"
        className="PostsList__button button"
        hidden={id !== selectedPost}
        onClick={resetUser}
      >
        Close
      </button>
    </li>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  selectedUserId: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  selectedPost: PropTypes.number.isRequired,
  resetUser: PropTypes.func.isRequired,
};
