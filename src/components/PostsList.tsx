import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  postSelected: Post | null;
  setPostSelected: (post: Post | null) => void;
  setIsFormVisible: (arg: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  postSelected,
  setPostSelected,
  setIsFormVisible,
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
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': postSelected?.id !== post.id,
                    })}
                    onClick={() => {
                      setPostSelected(
                        postSelected?.id === post.id ? null : post,
                      );
                      setIsFormVisible(false);
                    }}
                  >
                    {postSelected?.id === post.id ? 'Close' : 'Open'}
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
