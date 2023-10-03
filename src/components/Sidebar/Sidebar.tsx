import classNames from 'classnames';
import { PostDetails } from '../PostDetails/PostDetails';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
};

export const Sidebar: React.FC<Props> = ({ post }) => {
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
        <PostDetails
          post={post}
        />
      </div>
    </div>
  );
};
