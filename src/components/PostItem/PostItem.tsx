import React, { useContext } from 'react';
import classNames from 'classnames';
import { PostContext } from '../../contexts/PostContext';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({
  post,
}) => {
  const {
    id,
    title,
  } = post;

  const {
    post: selectedPost,
    setPost: setSelectedPost,
  } = useContext(PostContext);

  const isSelected = id === selectedPost?.id;

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
          className={classNames(
            'button',
            'is-link',
            {
              'is-light': !isSelected,
            },
          )}
          onClick={() => setSelectedPost(isSelected ? null : post)}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
