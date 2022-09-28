import React from 'react';
import classNames from 'classnames';
import { PostDetails } from '../PostDetails';
import { Post } from '../../types/Post';
import { Error } from '../../types/Error';

type Props = {
  posts: Post[];
  postId: number | null;
  error: Error | null;
  onError: (error: Error | null) => void;
};

export const Sidebar: React.FC<Props> = ({
  posts,
  postId,
  error,
  onError,
}) => (
  <div
    data-cy="Sidebar"
    className={classNames(
      'tile',
      'is-parent',
      'is-8-desktop',
      'Sidebar',
      { 'Sidebar--open': postId },
    )}
  >
    <div
      className="
        tile
        is-child
        box
        is-success"
    >
      {postId && (
        <PostDetails
          posts={posts}
          postId={postId}
          error={error}
          onError={onError}
        />
      )}
    </div>
  </div>
);
