import { FC, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { PostsContext } from '../PostsProvider';

export const Sidebar: FC = () => {
  const { selectedPost, isLoading } = useContext(PostsContext);
  const shoudBeShown = useMemo(
    () => selectedPost !== null && !isLoading, [selectedPost, isLoading],
  );

  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        { 'Sidebar--open': shoudBeShown },
      )}
    >
      <div className="tile is-child box is-success ">
        {shoudBeShown && <PostDetails />}
      </div>
    </div>
  );
};
