import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  currentPost: Post | null;
  onPostSelect: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  currentPost,
  onPostSelect,
}) => (
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
                  'is-light': currentPost?.id !== post.id,
                })}
                onClick={() =>
                  onPostSelect(currentPost?.id !== post.id ? post : null)
                }
              >
                {currentPost?.id !== post.id ? 'Open' : 'Close'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
