import cn from 'classnames';
import { FC, memo } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[]
  selectedPostId: number
  onPostBtnClick: (postId: number) => unknown
};

export const PostsList: FC<Props> = memo(({
  posts, onPostBtnClick, selectedPostId,
}) => {
  const handlePostBtnClick = (postId: number) => {
    if (selectedPostId === postId) {
      onPostBtnClick(0);
    } else {
      onPostBtnClick(postId);
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
          {posts.map(({ id, title }) => (
            <tr key={id} data-cy="Post">
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn(
                    'button',
                    'is-link',
                    { 'is-light': selectedPostId !== id },
                  )}
                  onClick={() => handlePostBtnClick(id)}
                >
                  {selectedPostId === id
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
});
