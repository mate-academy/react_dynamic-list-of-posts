import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  selectPost: (value: number | null) => void,
  selectedPostId: number | null,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectPost,
  selectedPostId,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">

                {selectedPostId === post.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button',
                      'is-link',
                      { 'is-light': selectedPostId !== post.id },
                    )}
                    onClick={() => {
                      selectPost(null);
                    }}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button',
                      'is-link',
                      { 'is-light': selectedPostId !== post.id },
                    )}
                    onClick={() => {
                      selectPost(post.id);
                    }}
                  >
                    Open
                  </button>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
