import React from 'react';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  selectedPost: Post | null;
  onSelectPost: (post: Post) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  onSelectPost = () => {},
}) => {
  const { id, title } = post;
  const isSelected = selectedPost?.id === post.id;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={`button is-link ${isSelected ? '' : 'is-light'}`}
          onClick={() => onSelectPost(post)}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
