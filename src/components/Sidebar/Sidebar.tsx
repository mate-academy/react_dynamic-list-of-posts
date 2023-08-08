import classNames from 'classnames';
import { useContext } from 'react';
import { PostDetails } from '../PostData/PostDetails';
import { StateContext } from '../../reducer/store';

export const Sidebar = () => {
  const { selectedPost } = useContext(StateContext);

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
        <div className="tile is-child box is-success ">
          <PostDetails />
        </div>
      )}
    </div>
  );
};
