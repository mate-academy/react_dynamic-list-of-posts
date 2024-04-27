import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';
import React, { useContext } from 'react';
import { postsContext } from '../../Store';
export const Sidebar: React.FC = () => {
  const { state } = useContext(postsContext);
  const { selectedPost } = state;

  return (
    <div
      data-cy="Sidebar"
      className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': selectedPost,
      })}
    >
      <div className="tile is-child box is-success ">
        {selectedPost && <PostDetails post={selectedPost} />}
      </div>
    </div>
  );
};
