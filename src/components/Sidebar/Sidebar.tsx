import { useContext } from 'react';
import classNames from 'classnames';
import { PostDetails } from '../PostDetails/PostDetails';
import { PostsValueContext } from '../../Context/PostsContext';

export const Sidebar: React.FC = () => {
  const { isSidebarOpen } = useContext(PostsValueContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': isSidebarOpen,
      })}
    >
      <div className="tile is-child box is-success ">
        <PostDetails />
      </div>
    </div>
  );
};
