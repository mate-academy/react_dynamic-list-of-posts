import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';
import { PostDetails } from './PostDetails';

type Props = {
  selectedPost: Post | null,
};

export const Sidebar: React.FC<Props> = ({ selectedPost }) => {
  return (
    <div
      data-cy="Sidebar"
      className={classNames('tile is-parent is-8-desktop Sidebar', {
        'Sidebar--open': selectedPost,
      })}
    >
      <div className="tile is-child box is-success ">
        {selectedPost && <PostDetails selectedPost={selectedPost} />}
      </div>
    </div>
  );
};
