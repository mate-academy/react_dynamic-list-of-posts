import React, { useCallback } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  isOpenPost: boolean;
  onSelectedPost: (post: Post) => void;
  onPostOpen: (isOpen: boolean) => void;
  setIsOpenCommentForm: (isOpen: boolean) => void;
};

export const PostsList = React.memo<Props>(
  ({
    posts,
    selectedPost,
    isOpenPost,
    onSelectedPost,
    onPostOpen,
    setIsOpenCommentForm,
  }) => {
    const handleOpenPost = useCallback(
      (post: Post) => {
        if (selectedPost?.id === post.id && isOpenPost) {
          onPostOpen(false);
        } else {
          onPostOpen(true);
          onSelectedPost(post);
        }

        setIsOpenCommentForm(false);
      },
      [selectedPost, onPostOpen, onSelectedPost, isOpenPost],
    );

    return (
      <div data-cy="PostsList">
        <p className="title">Posts:</p>

        <table className="table is-fullwidth is-striped is-hoverable is-narrow">
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {posts.map(post => (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', {
                      'is-link': isOpenPost && selectedPost?.id === post.id,
                      'is-light': !isOpenPost || selectedPost?.id !== post.id,
                    })}
                    onClick={() => handleOpenPost(post)}
                  >
                    {isOpenPost && selectedPost?.id === post.id
                      ? 'Close'
                      : 'Open'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

PostsList.displayName = 'PostsList';
