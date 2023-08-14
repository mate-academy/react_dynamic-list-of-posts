import { FC } from 'react';
import classNames from 'classnames';
import { usePostsContext } from '../hooks';
import { PostDetails } from './Posts/PostDetails';

export const Sidebar: FC = () => {
  const { selectedPost } = usePostsContext();

  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        {
          'Sidebar--open': selectedPost,
        },
      )}
    >

      {selectedPost && (
        <div className="tile is-child box is-success">
          <PostDetails />
        </div>
      )}
    </div>
  );
};
