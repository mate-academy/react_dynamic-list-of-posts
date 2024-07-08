/* eslint-disable react/display-name */
import { memo } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface Props {
  userPosts: Post[];
  selectedPostId: number | null;
  setSelectPostId: (id: number | null) => void;
}

export const PostsList = memo((props: Props) => {
  const { userPosts, setSelectPostId, selectedPostId } = props;

  const selectPostHandler = (id: number) => {
    if (id === selectedPostId) {
      setSelectPostId(null);
    } else {
      setSelectPostId(id);
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
          {userPosts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() => selectPostHandler(post.id)}
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
