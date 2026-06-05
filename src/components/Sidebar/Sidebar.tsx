// .. Sidebar
import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { Post } from '../../types/Post';

interface SidebarProps {
  selectedPost: Post | null;
  isSidebarOpen: boolean; // 👈 Додали проп для контролю стану
}

export const Sidebar = ({ selectedPost, isSidebarOpen }: SidebarProps) => {
  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        { 'Sidebar--open': isSidebarOpen }, // 👈 Клас додається тільки якщо isSidebarOpen === true
      )}
    >
      <div className="tile is-child box is-success ">
        <PostDetails selectedPost={selectedPost} />
      </div>
    </div>
  );
};
