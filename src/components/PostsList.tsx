import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  openedPostID: number | null;
  onOpenPostID: (postId: number | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  openedPostID,
  onOpenPostID,
}) => {
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
          {posts.map(post => {
            const openedButton = openedPostID === post.id ? null : post.id;

            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': openedButton,
                    })}
                    onClick={() => onOpenPostID(openedButton)}
                  >
                    {!openedButton ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
