import React, { useContext } from 'react';
import cn from 'classnames';
import { PostContext } from './Context/PostContext';
import { Post } from '../types/Post';
import { CommentContext } from './Context/CommentContext';

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

  const { setIsOpenNewCommentForm } = useContext(CommentContext);

  const handleSelectPost = () => {
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }

    setIsOpenNewCommentForm(false);
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
