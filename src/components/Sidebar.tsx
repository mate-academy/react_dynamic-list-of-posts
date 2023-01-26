import classNames from 'classnames';
import { PostDetails } from './PostDetails';

export const Sidebar = () => {
  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        'Sidebar--open',
      )}
    >
      <div className="tile is-child box is-success ">
        <PostDetails />
      </div>
    </div>
  );
};
