import React, { useContext, useEffect } from 'react';
import { Post } from '../types/Post';
import { ContextUsers } from './UsersContext';
import cn from 'classnames';
import { getComments } from './api/getComments';

type Props = {
  posts: Post[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const {
    openSidebar,
    isLoading,
    setShowErrComments,
    selectedPost,
    setShowErrOnLoad,
    setComments,
    setVisibleLoader,
    setOpenSidebar,
    setSelectedPost,
    setErrInLoadingComments,
    setVisibleForm,
  } = useContext(ContextUsers);

  //@dev for load comments
  useEffect(() => {
    setShowErrComments(false);
    setVisibleLoader(true);
    setShowErrOnLoad(false);
    const loadComments = async () => {
      if (selectedPost) {
        getComments(selectedPost.id)
          .then(response => {
            setComments(response);
          })
          .catch(() => {
            setShowErrComments(true);
            setErrInLoadingComments(true);
          })
          .finally(() => {
            setVisibleLoader(false);
          });
      }
    };

    loadComments();
  }, [
    selectedPost,
    setComments,
    setShowErrComments,
    setShowErrOnLoad,
    setVisibleLoader,
    isLoading,
    setErrInLoadingComments,
  ]);

  const handlerPostOpen = (post: Post) => {
    setOpenSidebar(post.id);
    setSelectedPost(post);
    setVisibleForm(false);

    if (openSidebar === post.id) {
      setOpenSidebar(null);
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
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => {
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    onClick={() => handlerPostOpen(post)}
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': openSidebar !== post.id,
                    })}
                  >
                    {openSidebar === post.id ? 'Close' : 'Open'}
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
