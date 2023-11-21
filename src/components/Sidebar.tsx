import React, { useContext } from 'react';
import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { ListContext } from './ListContext';

export const Sidebar: React.FC = () => {
  const { selectedPost } = useContext(ListContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        { 'Sidebar--open': selectedPost.id !== -1 },
      )}
    >
      <div className="tile is-child box is-success ">
        <PostDetails post={selectedPost} />
      </div>
    </div>
  );
};
