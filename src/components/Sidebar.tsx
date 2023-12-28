import React, { useContext } from 'react';
import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { PostsContext } from '../store/PostsContext';
import { CommentsProvider } from '../store/CommentsContext';

export const Sidebar: React.FC = () => {
  const { selectedPost } = useContext(PostsContext);

  return (
    <CommentsProvider>
      <div
        data-cy="Sidebar"
        className={
          classNames(
            'tile',
            'is-parent',
            'is-8-desktop',
            'Sidebar',
            { 'Sidebar--open': selectedPost },
          )
        }
      >
        <div className="tile is-child box is-success ">
          <PostDetails />
        </div>
      </div>
    </CommentsProvider>
  );
};
