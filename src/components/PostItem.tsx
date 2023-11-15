import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';
import { getComments } from '../utils/helpers';
import { Comment } from '../types/Comment';
import { LoadingItems } from '../types/LoadingItems';
import { HasErrorItem } from '../types/ErrorMessage';

type Props = {
  post: Post;
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<LoadingItems>>,
  setHasError: React.Dispatch<React.SetStateAction<HasErrorItem>>,
};

export const PostItem: React.FC<Props> = ({
  post,
  selectedPost,
  setSelectedPost,
  setComments,
  setIsLoading,
  setHasError,
}) => {
  const handleSelectedPost = async (chosenPost: Post) => {
    try {
      if (selectedPost?.id === post.id) {
        setSelectedPost(null);

        return;
      }

      setSelectedPost(chosenPost);
      setIsLoading('Comments');

      const commentsFromServer = await getComments(chosenPost.id);

      setComments(commentsFromServer);
    } catch {
      setHasError('Comments');
    } finally {
      setIsLoading('');
    }
  };

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
          className={cn('button is-link', {
            'is-light': selectedPost?.id !== post.id,
          })}
          onClick={() => handleSelectedPost(post)}
        >
          {selectedPost?.id !== post.id ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>

  );
};
