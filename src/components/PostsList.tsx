/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { Context, DispatchContext } from '../Store';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';

export const PostsList: React.FC = () => {
  const { selectedUser, posts, currentPost } = useContext(Context);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (selectedUser) {
      dispatch({ type: 'loaderPost', payload: false });
      getPosts(selectedUser.id)
        .then(response => {
          dispatch({ type: 'setPosts', payload: response });
        })
        .catch(() => {
          dispatch({ type: 'setErrorPosts', payload: 'Something went wrong!' });
        })
        .finally(() => {
          dispatch({ type: 'loaderPost', payload: false });
        });
    }
  }, [selectedUser]);

  const openPost = (post: Post) => {
    if (currentPost?.id === post.id) {
      dispatch({ type: 'setWriteCommentActive', payload: false });
      dispatch({ type: 'setCurrentPost', payload: null });

      return;
    }

    dispatch({ type: 'setWriteCommentActive', payload: false });
    dispatch({ type: 'setCurrentPost', payload: post });
  };

  return (
    <>
      {selectedUser !== null && !!posts?.length && (
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
              {posts?.map(post => {
                return (
                  <tr data-cy="Post" key={post.id}>
                    <td data-cy="PostId">{post.id}</td>

                    <td data-cy="PostTitle">{post.title}</td>

                    <td className="has-text-right is-vcentered">
                      <button
                        type="button"
                        data-cy="PostButton"
                        className={`button is-link ${
                          currentPost?.id !== post.id ? 'is-light' : ''
                        }`}
                        onClick={() => openPost(post)}
                      >
                        {currentPost?.id === post.id ? 'Close' : 'Open'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
