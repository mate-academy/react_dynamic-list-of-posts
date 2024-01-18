import React, { useContext } from 'react';
import classNames from 'classnames';

import { StateContext } from '../../Store';

import { PostDetails } from '../PostDetails';

export const Sidebar: React.FC = () => {
  const { selectedPost } = useContext(StateContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames('tile is-parent is-8-desktop Sidebar', {
        'Sidebar--open': !!selectedPost,
      })}
    >
      <div className="tile is-child box is-success">
        {!!selectedPost && (
          <PostDetails />
        )}
      </div>
    </div>
  );
};
