import React from 'react';
import { usePostContext } from '../utils/PostContext';
import classNames from 'classnames';
import { Post } from '../types/Post';
import * as commentsServices from './api/comments';

export const PostsList: React.FC = () => {
  const {
    posts,
    selectedPost,
    isSidebarOpen,
    setSelectedPost,
    setComments,
    setIsCommentsLoading,
    setIsNewCommentFormOpen,
    setIsSidebarOpen,
    setIsCommentsError,
  } = usePostContext();

  const handleSelectedPost = (post: Post) => {
    if (isSidebarOpen) {
      if (selectedPost?.id === post.id) {
        setSelectedPost(null);
        setIsSidebarOpen(false);

        return;
      }
    }

    setIsNewCommentFormOpen(false);
    setIsCommentsError(false);
    setIsSidebarOpen(true);
    setSelectedPost(post);
    setIsCommentsLoading(true);

    commentsServices
      .getComments(post.id)
      .then(setComments)
      .catch(() => setIsCommentsError(true))
      .finally(() => setIsCommentsLoading(false));
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
                  className={classNames('button', 'is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                  onClick={() => handleSelectedPost(post)}
                >
                  {selectedPost?.id !== post.id ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
