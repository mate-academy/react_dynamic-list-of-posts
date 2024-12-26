import cn from 'classnames';
import { PostDetails } from './PostDetails';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post | null;
};
export const Sidebar: React.FC<Props> = ({ selectedPost }) => {
  return (
    <div
      data-cy="Sidebar"
      className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': !!selectedPost,
      })}
    >
      {selectedPost && (
        <div className="tile is-child box is-success ">
          <PostDetails selectedPost={selectedPost} />
        </div>
      )}
    </div>
  );
};
