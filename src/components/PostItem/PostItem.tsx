import { FC } from 'react';
import cn from 'classnames';
import { Post } from '../../types/Post';

interface Props {
  post: Post,
  selectedPostId: number,
  onPostSelect: (post: number) => void
}

export const PostItem: FC<Props> = (props) => {
  const { post, onPostSelect, selectedPostId } = props;
  const { id, title } = post;

  const handleSelectPost = (postId: number) => {
    if (postId === selectedPostId) {
      onPostSelect(0);

      return;
    }

    onPostSelect(postId);
  };

  const isSelected = selectedPostId === id;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">
        {id}
      </td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': !isSelected,
          })}
          onClick={() => handleSelectPost(id)}
        >
          {isSelected
            ? 'Close'
            : 'Open'}
        </button>
      </td>
    </tr>
  );
};
