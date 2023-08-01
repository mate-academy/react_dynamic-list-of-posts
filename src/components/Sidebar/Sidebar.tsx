import classNames from 'classnames';
import { useContext } from 'react';
import { PostDetails } from '../PostDetails';
import { PostContext } from '../../context/PostContext';

export const Sidebar = () => {
  const { selectedPost } = useContext(PostContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        { 'Sidebar--open': selectedPost },
      )}
    >
      <div className="tile is-child box is-success ">
        {selectedPost && <PostDetails />}
      </div>
    </div>
  );
};
