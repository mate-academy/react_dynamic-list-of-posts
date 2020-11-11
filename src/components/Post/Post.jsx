import React, { useCallback } from 'react';
import { ProstProps } from '../../props/PostProps';

export const Post = ({ id, userId, title, postId, setPostId }) => (
  <>
    <div>
      <b>{`[User #${userId}]: `}</b>
      {title}
    </div>
    <button
      type="button"
      className="PostsList__button button"
      onClick={useCallback(
        () => {
          postId === id
            ? setPostId(null)
            : setPostId(id);
        },
        [id, postId, setPostId],
      )}
    >
      {postId === id ? 'Close' : 'Open'}
    </button>
  </>
);

Post.propTypes = ProstProps;
