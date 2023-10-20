import React, { useContext } from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';
import { getComments } from '../api/Comments';
import { CommentsContext } from '../CommentsContext';
import { PostContext } from '../PostContext';

export const PostsList: React.FC = () => {
  const {
    setComments,
    setIsCommentLoading,
    setIsCommentLoadError,
    setIsCommentUpdateError,
    setIsCommentDeleteError,
    setIsFormShown,
  } = useContext(CommentsContext);

  const {
    posts,
    selectedPost,
    setSelectedPost,
  } = useContext(PostContext);

  const handleOpenPostClick = (post: Post) => {
    setIsFormShown(false);
    setIsCommentLoadError(false);
    setIsCommentUpdateError(false);
    setIsCommentDeleteError(false);

    if (selectedPost && selectedPost.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
      setIsCommentLoading(true);

      getComments(post.id)
        .then(setComments)
        .catch(() => {
          setIsCommentLoadError(true);
        })
        .finally(() => {
          setIsCommentLoading(false);
        });
    }
  };

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
          {posts.map(post => {
            const { id, title } = post;
            const isPostSelected = selectedPost && selectedPost.id === post.id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': !isPostSelected,
                    })}
                    onClick={() => handleOpenPostClick(post)}
                  >
                    {isPostSelected
                      ? 'Close'
                      : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
