import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPostId: number | null;
  onOpen: (post: Post) => void;
  onClose: () => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onOpen,
  onClose,
}) => {
  return (
    <table
      className="table is-fullwidth is-striped is-hoverable"
      data-cy="PostsList"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th className="has-text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {posts.map(post => {
          const isSelected = post.id === selectedPostId;

          return (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td>{post.title}</td>
              <td className="has-text-right">
                <button
                  type="button"
                  className={classNames('button', {
                    'is-light': !isSelected,
                  })}
                  data-cy="PostButton"
                  onClick={() => {
                    if (isSelected) {
                      onClose();
                    } else {
                      onOpen(post);
                    }
                  }}
                >
                  {isSelected ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
