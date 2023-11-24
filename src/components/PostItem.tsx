import React, { useContext } from 'react';
import cn from 'classnames';
import { PostContext } from './PostContext';
import { Post } from '../types/Post';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const {
    id,
    title,
  } = post;

  const {
    selectedPost,
    setSelectedPost,
  } = useContext(PostContext);

  const handleSelectPost = () => {
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <>
      <tr data-cy="Post">
        <td data-cy="PostId">{id}</td>

        <td data-cy="PostTitle">
          {title}
        </td>

        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className={cn(
              'button is-link',
              { 'is-light': selectedPost?.id !== id },
            )}
            onClick={handleSelectPost}
          >
            {selectedPost?.id === id ? 'Close' : 'Open'}
          </button>
        </td>
      </tr>
    </>
  );
};
