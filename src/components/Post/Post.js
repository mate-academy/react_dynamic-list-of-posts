import React from 'react';

// eslint-disable-next-line react/prop-types
export const Post = ({ userId, title, id, selectPost, selectedPost }) => {
  const choosePost = () => {
    if (selectedPost === id) {
      selectPost(null);

      return;
    }

    selectPost(id);
  };

  return (
    <>
      <div>
        <b>{`User #${userId}`}</b>
        <p>{title}</p>
      </div>

      <button
        type="button"
        className="PostsList__button button"
        onClick={choosePost}
      >
        {selectedPost === id ? 'Close' : 'Open'}
      </button>
    </>
  );
};
