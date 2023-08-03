import React from 'react';
import cn from 'classnames';
import { PostDetails } from './PostDetails';
import { usePost } from '../hooks/usePost';

const PostSidebar:React.FC = () => {
  const { selectedPost } = usePost();

  return (
    <div
      data-cy="Sidebar"
      className={cn(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar', {
          'Sidebar--open': selectedPost,
        },
      )}
    >
      {
        selectedPost && (
          <div className="tile is-child box is-success ">
            <PostDetails />
          </div>
        )
      }
    </div>
  );
};

export default PostSidebar;
