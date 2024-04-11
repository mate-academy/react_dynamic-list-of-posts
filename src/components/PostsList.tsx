import React from 'react';
import classNames from 'classnames';
import { usePostInfo } from '../utils/PostContext';
import { Post } from '../types/Post';
import * as commentsServices from '../api/comments';

export const PostsList: React.FC = () => {
  const {
    posts,
    selectedPost,
    setSelectedPost,
    setComments,
    setIsCommentLoading,
    setNewCommentFormOpen,
    sidebarOpen,
    setSidebarOpen,
    setErrCommentsLoading,
  } = usePostInfo();

  const handleSelectPost = (post: Post) => {
    if (sidebarOpen) {
      if (selectedPost?.id === post.id) {
        setSelectedPost(null);
        setSidebarOpen(false);

        return;
      }
    }

    setNewCommentFormOpen(false);
    setErrCommentsLoading(false);
    setSidebarOpen(true);
    setSelectedPost(post);
    setIsCommentLoading(true);

    commentsServices
      .getComments(post.id)
      .then(setComments)
      .catch(err => setErrCommentsLoading(err))
      .finally(() => setIsCommentLoading(false));
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
                  onClick={() => handleSelectPost(post)}
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
