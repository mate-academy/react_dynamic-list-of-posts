import React, { useContext } from 'react';
import classNames from 'classnames';
import { MainContext } from '../MainContext';
import { PostDetails } from '../Comments/PostDetails';

export const PostSlidebar: React.FC = () => {
  const { currentPost } = useContext(MainContext);

  return (

    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        { 'Sidebar--open': currentPost?.id },
      )}
    >
      <div className="tile is-child box is-success ">
        {currentPost && <PostDetails />}
      </div>
    </div>

  );
};
