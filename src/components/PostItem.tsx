import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
import { getComments } from '../api/posts';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  openPostId: number | null;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setHasErrorGetComments: (flag: boolean) => void;
  setIsLoadingComments: (flag: boolean) => void;
  setPost: (post: Post | null) => void;
  setOpenPostId: (postId: number | null) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  openPostId,
  setComments,
  setHasErrorGetComments,
  setIsLoadingComments,
  setPost,
  setOpenPostId,
}) => {
  const handleClick = (item: Post) => {
    if (post.id === openPostId) {
      setPost(null);
      setOpenPostId(null);

      return;
    }

    setOpenPostId(post.id);
    setIsLoadingComments(true);
    setPost(item);

    getComments(item.id)
      .then((comments: Comment[]) => {
        setComments(comments);
      })
      .catch(() => {
        setHasErrorGetComments(true);
      })
      .finally(() => {
        setIsLoadingComments(false);
      });
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': openPostId !== post.id,
          })}
          onClick={() => handleClick(post)}
        >
          {openPostId !== post.id ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
