import React, { useCallback } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  onOpenPost: (post: Post) => void;
  onClosePost: () => void;
  openedPost?: Post;
  formStatus: boolean;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onOpenPost,
  openedPost,
  formStatus,
  onClosePost,
}) => {
  const handleClickOpen = useCallback(
    (post: Post) => {
      if (openedPost && openedPost.id === post.id && formStatus) {
        onClosePost();
      } else {
        onOpenPost(post);
      }
    },
    [openedPost, formStatus, onClosePost, onOpenPost],
  );

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(`button is-link`, {
                    'is-light': openedPost?.id !== post.id || !formStatus,
                  })}
                  onClick={() => handleClickOpen(post)}
                >
                  {openedPost && openedPost.id === post.id && formStatus
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
};
