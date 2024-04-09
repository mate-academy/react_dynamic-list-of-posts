import cn from 'classnames';
import { FC } from 'react';
import { useGlobalContext } from '../../lib/GlobalContext';
import { PostDetails } from '../PostDetails';

export const SideBar: FC = () => {
  const { selectPost } = useGlobalContext();

  return (
    <div
      data-cy="Sidebar"
      className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': !!selectPost,
      })}
    >
      <div className="tile is-child box is-success ">
        {selectPost && <PostDetails />}
      </div>
    </div>
  );
};
