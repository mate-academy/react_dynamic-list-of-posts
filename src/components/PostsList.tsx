import { FC, memo } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface Props {
  posts: Post[] | null;
  selectedPost: Post | null
  onSelect: (post: Post | null) => void;
}
export const PostsList: FC<Props> = memo(({
  posts,
  selectedPost,
  onSelect,
}) => {
  const isPostSelected = (post: Post) => post.id === selectedPost?.id;
  const handleSelect = (post: Post) => {
    if (isPostSelected(post)) {
      onSelect(null);
    } else {
      onSelect(post);
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
          {posts?.map(post => (
            <tr
              key={post.id}
              data-cy="Post"
            >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn(
                    'button is-link',
                    { 'is-light': !isPostSelected(post) },
                  )}
                  onClick={() => handleSelect(post)}
                >
                  {isPostSelected(post) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
