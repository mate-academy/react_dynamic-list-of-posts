import classNames from 'classnames';
import React, { useContext } from 'react';
import { PostDetails } from './PostDetails';
import { StateContext } from '../Store';

export const Sidebar: React.FC = () => {
  const { selectedPost, hasSidebar } = useContext(StateContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': hasSidebar,
      })}
    >
      <div className="tile is-child box is-success ">
        {selectedPost && <PostDetails selectedPost={selectedPost} />}
      </div>
    </div>
  );
};
