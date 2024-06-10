import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { useContext } from 'react';
import { PostContext } from '../context/PostContextProvider';

export const Sidebar = () => {
  const { post } = useContext(PostContext);

  return (
    <div
      data-cy="Sidebar"
      className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': post,
      })}
    >
      <div className="tile is-child box is-success">
        {post && <PostDetails post={post} />}
      </div>
    </div>
  );
};
