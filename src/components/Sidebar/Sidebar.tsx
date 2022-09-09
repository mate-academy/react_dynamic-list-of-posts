import classNames from 'classnames';

import { PostDetails } from '../PostDetails/PostDetails';

import './Sidebar.scss';

export const Sidebar: React.FC = () => {
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
