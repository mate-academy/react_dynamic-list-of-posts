import React from 'react';

export const Post = React.memo(
// eslint-disable-next-line react/prop-types
  ({ userId, title, id, selectPost, selectedPost }) => {
    const choosePost = () => {
      if (selectedPost === id) {
        selectPost(null);

        return;
      }

      selectPost(id);
    };

    // eslint-disable-next-line no-console
    console.log('Post');

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
  },
);
