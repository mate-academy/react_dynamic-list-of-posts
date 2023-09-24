import { useContext } from 'react';
import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { PostsContext } from '../context/PostsContext';

export const Sidebar = () => {
  const { post } = useContext(PostsContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        { 'Sidebar--open': !!post },
      )}
    >
      <div className="tile is-child box is-success ">
        <PostDetails />
      </div>
    </div>
  );
};
