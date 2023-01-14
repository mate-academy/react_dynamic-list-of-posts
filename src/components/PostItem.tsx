import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  selectedPostId: number;
  onSelectPostId: React.Dispatch<React.SetStateAction<number>>;
  onCloseNewCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPostId,
  onSelectPostId,
  onCloseNewCommentForm,
}) => {
  const handleClickPostButton = (postId: number) => {
    onSelectPostId(prev => (prev !== postId ? postId : 0));
    onCloseNewCommentForm(false);
  };

  const {
    id,
    title,
  } = post;

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
          className={cn(
            'button',
            'is-link',
            { 'is-light': selectedPostId !== id },
          )}
          onClick={() => handleClickPostButton(id)}
        >
          {selectedPostId === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
