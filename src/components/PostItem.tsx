import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

interface Props {
  post: Post;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  loadComments: (postId: number) => void;
  selectedPost: Post | null;
  setComments: (comments: Comment[]) => void;
  setIsOpenComment: (value: boolean) => void;
}

export const PostItem: React.FC<Props> = ({
  post,
  setSelectedPost,
  loadComments,
  selectedPost,
  setComments,
  setIsOpenComment,
}) => {
  function handleSelect(postTake: Post) {
    if (selectedPost?.id === postTake.id) {
      setSelectedPost(null);
      setComments([]);
    } else {
      setSelectedPost(postTake);
      loadComments(postTake.id);
      setIsOpenComment(false);
    }
  }

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': selectedPost?.id !== post.id,
          })}
          onClick={() => handleSelect(post)}
        >
          {selectedPost?.id === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
