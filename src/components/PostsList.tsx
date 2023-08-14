import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  selectedPost: Post | null,
  onSetSelectedPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSetSelectedPost,
}) => {
  const handlerOpenPost = (newSelectedPost: Post) => {
    if (selectedPost === newSelectedPost) {
      onSetSelectedPost(null);
    } else {
      onSetSelectedPost(newSelectedPost);
    }
  };

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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': selectedPost !== post },
                  )}
                  onClick={() => handlerOpenPost(post)}
                >
                  {selectedPost === post
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
