import { usePostContext } from '../utils/PostContext';
import { PostDetails } from './PostDetails';
import classNames from 'classnames';

export const Sidebar = () => {
  const { selectedPost } = usePostContext();

  return (
    <div
      data-cy="Sidebar"
      className={classNames('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': !!selectedPost,
      })}
    >
      {!!selectedPost && (
        <div className="tile is-child box is-success ">
          <PostDetails />
        </div>
      )}
    </div>
  );
};
