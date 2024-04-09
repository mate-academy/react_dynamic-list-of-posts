import cn from 'classnames';
import React from 'react';
import { useGlobalContext } from '../lib/GlobalContext';
import type { Post } from '../types/Post';
import * as servicesComments from '../api/comments';

export const PostsList: React.FC = () => {
  const {
    setIsFormOpen,
    isSideBarOpen,
    setIsSideBarOpen,
    setIsCommentLoading,
    setHasErrorMessage,
    posts,
    selectPost,
    setSelectPost,
    setComments,
  } = useGlobalContext();

  const handleSelectPost = async (post: Post) => {
    setIsFormOpen(false);

    if (isSideBarOpen) {
      if (post.id === selectPost?.id) {
        setSelectPost(null);
        setIsSideBarOpen(false);

        return;
      }
    }

    setHasErrorMessage(false);
    setSelectPost(post);
    setIsSideBarOpen(true);

    try {
      setIsCommentLoading(true);
      const data = await servicesComments.getComments(post.id);

      setComments(data);
    } catch (error) {
      setHasErrorMessage(true);
    } finally {
      setIsCommentLoading(false);
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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {posts?.map(post => {
            const { id, title } = post;
            const isSelectPost = selectPost && selectPost.id === id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': !isSelectPost,
                    })}
                    onClick={() => handleSelectPost(post)}
                  >
                    {isSelectPost ? 'Close' : 'Open'}
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
