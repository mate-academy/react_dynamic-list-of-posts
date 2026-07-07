import { Post } from '../types/Post';
import cn from 'classnames';

type Props = {
  posts: Post[];
  activeBtnId: number | null;
  setActiveBtnId: (value: number | null) => void;
  setActivePost: (value: Post | null) => void;
};

export const PostsList = ({
  posts,
  activeBtnId,
  setActiveBtnId,
  setActivePost,
}: Props) => {
  const handleClick = (post: Post) => {
    if (activeBtnId === post.id) {
      setActiveBtnId(null);
      setActivePost(null);
    } else {
      setActiveBtnId(post.id);
      setActivePost(post);
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
                  className={cn('button is-link', {
                    'is-light': activeBtnId !== post.id,
                  })}
                  onClick={() => {
                    handleClick(post);
                  }}
                >
                  {activeBtnId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
