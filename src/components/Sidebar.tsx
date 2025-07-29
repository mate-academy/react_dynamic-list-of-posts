import React from 'react';
import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { Post } from '../types/Post';

type Props = {
  activePost: Post | null;
};

export const Sidebar: React.FC<Props> = ({ activePost }) => {
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
        <PostDetails activePost={activePost} />
      </div>
    </div>
  );
};
