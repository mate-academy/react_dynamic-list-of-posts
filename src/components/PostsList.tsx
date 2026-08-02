import classNames from 'classnames';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPostId: number | undefined;
  onPostSelect: (post: Post | null) => void;
}

export const PostsList = ({ posts, selectedPostId, onPostSelect }: Props) => {
  const handlePostSelect = (post: Post) => {
    if (selectedPostId === post.id) {
      onPostSelect(null);

      return;
    }

    onPostSelect(post);
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPostId !== post.id,
                  })}
                  onClick={() => handlePostSelect(post)}
                >
                  {selectedPostId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
