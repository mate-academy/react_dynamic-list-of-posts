import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../management/StateContext';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const {
    posts,
    openCommentsButton,
    currentPost,
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleOpenComments = (post: Post) => {
    dispatch({ type: 'currentPost', payload: null });
    dispatch({ type: 'openComments', payload: true });
    dispatch({ type: 'currentPost', payload: post });
    dispatch({ type: 'showForm', payload: false });
  };

  const handleCloseComments = () => {
    dispatch({ type: 'showForm', payload: false });
    dispatch({ type: 'openComments', payload: false });
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
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {openCommentsButton
                  && currentPost
                  && post.id === currentPost.id ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                      onClick={handleCloseComments}
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => handleOpenComments(post)}
                    >
                      Open
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
