import React, { useContext } from 'react';
import classNames from 'classnames';
import { PostDetails } from './PostDetails/PostDetails';
import { ActivePostContext } from '../../utils/Store';

export const SideBar: React.FC = () => {
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
