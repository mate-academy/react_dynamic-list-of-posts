import {
  FC,
  memo,
  useContext,
  useMemo,
} from 'react';

import classNames from 'classnames';
import { PostsContext } from '../PostsContext';
import { PostDetails } from './PostDetails';

export const Sidebar: FC = memo(() => {
  const { selectedPost, isLoading } = useContext(PostsContext);
  const shoudBeShown = useMemo(
    () => selectedPost !== null && !isLoading,
    [selectedPost, isLoading],
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
      <div className="tile is-child box is-success">
        {shoudBeShown && <PostDetails />}
      </div>
    </div>
  );
});
