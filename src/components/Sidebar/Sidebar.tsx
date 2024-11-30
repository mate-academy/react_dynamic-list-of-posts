import React, { useContext } from 'react';
import { PostDetails } from './PostDetails/PostDetails';
import { ActivePostContext } from '../../utils/Store';
import classNames from 'classnames';

export const Sidebar: React.FC = () => {
  const { activePost } = useContext(ActivePostContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': activePost,
      })}
    >
      <div className="tile is-child box is-success ">
        {activePost && <PostDetails />}
      </div>
    </div>
  );
};
