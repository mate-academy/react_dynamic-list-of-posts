import { FC } from 'react';
import classNames from 'classnames';
import { Post } from '../../types';
import { usePostsContext } from '../../hooks/usePostsContext';

type Props = {
  post: Post;
};

export const PostInfo: FC<Props> = ({ post }) => {
  const { selectedPost, onSelectPost } = usePostsContext();

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': post.id !== selectedPost?.id,
          })}
          onClick={() => onSelectPost(post)}
        >
          {
            post.id === selectedPost?.id
              ? 'Close'
              : 'Open'
          }
        </button>
      </td>
    </tr>
  );
};
