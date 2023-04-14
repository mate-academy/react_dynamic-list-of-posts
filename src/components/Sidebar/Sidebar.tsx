import React, { useContext } from 'react';
import classNames from 'classnames';
import { PostDetails } from '../PostDetails';
import { PostContext } from '../../contexts/PostContext';

export const Sidebar: React.FC = () => {
  const { post: selectedPost } = useContext(PostContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        {
          'Sidebar--open': selectedPost,
        },
      )}
    >
      {selectedPost && (
        <div className="tile is-child box is-success ">
          <PostDetails selectedPost={selectedPost} />
        </div>
      )}
    </div>
  );
};
