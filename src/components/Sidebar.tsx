import cn from 'classnames';
import React from 'react';
import { useValues } from '../SharedContext';
import { PostDetails } from './PostDetails';

export const Sidebar: React.FC = () => {
  const { selectedPost } = useValues();

  return (
    <div
      data-cy="Sidebar"
      className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': selectedPost,
      })}
    >
      <div className="tile is-child box is-success ">
        {selectedPost && <PostDetails post={selectedPost} />}
      </div>
    </div>
  );
};
