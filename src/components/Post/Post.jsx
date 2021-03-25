import React from 'react';

export const Post = ({ title, userId, selectedUSerId, id, selectedPost, resetUSer }) => {
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
        onClick={() => selectedUSerId(id)}
      >
        Open
      </button>
      <button
        type="button"
        className="PostsList__button button"
        hidden={id !== selectedPost}
        onClick={resetUSer}
      >
        Close
      </button>
    </li>
  );
};
