import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import { PostDetails } from './PostDetails';

export const Sidebar = () => {
  const { postState: [post] } = useContext(AppContext);

  return (
    <div
      data-cy="Sidebar"
      className={cn(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        { 'Sidebar--open': post },
      )}
    >
      {post && (
        <div className="tile is-child box is-success ">
          <PostDetails post={post} />
        </div>
      )}
    </div>
  );
};
