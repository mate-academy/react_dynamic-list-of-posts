import cn from 'classnames';
import { PostDetails } from './Posts/PostDetails';
import { useUiStore } from '../store/uiStore';

export const Sidebar = () => {
  const isOpen = useUiStore((state) => state.isSidebarOpen);

  return (
    <div
      data-cy="Sidebar"
      className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': isOpen,
      })}
    >
      <div className="tile is-child box is-success ">
        <PostDetails />
      </div>
    </div>
  );
};
