import React from 'react';
import { IPost } from '../models/IPost';
import { usePost } from '../hooks/usePost';

type PostListItemProps = {
  post: IPost,
};

const PostListItem:React.FC<PostListItemProps> = ({ post }) => {
  const { onPostSelecting, selectedPost, onPostClosing } = usePost();

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        {
          selectedPost?.id === post.id
            ? (
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link"
                onClick={onPostClosing}
              >
                Close
              </button>
            )
            : (
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link is-light"
                onClick={() => onPostSelecting(post)}
              >
                Open
              </button>
            )
        }
      </td>
    </tr>
  );
};

export default PostListItem;
