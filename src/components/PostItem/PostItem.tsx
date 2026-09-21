import { Post } from '../../types/Post';

import cn from 'classnames';

type Props = {
  post: Post;
  selectedPost: Post | null;
  onPostSelected: (newSelectedPost: Post | null) => void;
};

export const PostItem = ({ post, selectedPost, onPostSelected }: Props) => {
  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': selectedPost?.id !== post.id,
          })}
          onClick={() => {
            if (selectedPost && selectedPost?.id === post.id) {
              onPostSelected(null);
            } else {
              onPostSelected(post);
            }
          }}
        >
          {selectedPost?.id === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
