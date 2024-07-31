import React, { useContext } from 'react';
import { DispatchContext, StatesContext } from '../context/Store';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { postsByUserId, selectedPostId, isSidebarOpen } =
    useContext(StatesContext);

  const handleOnOpen = (post: Post) => {
    if (!isSidebarOpen) {
      dispatch({ type: 'SET_SIDEBAR', payload: true });
    }

    dispatch({
      type: 'SET_COMMENTFORM',
      payload: false,
    });

    dispatch({
      type: 'SET_SELECTEDPOSTID',
      payload: post.id,
    });
  };

  const handleOnClose = () => {
    dispatch({
      type: 'SET_SIDEBAR',
      payload: false,
    });

    dispatch({
      type: 'SET_SELECTEDPOSTID',
      payload: null,
    });
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
          {postsByUserId.map(post => {
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  {selectedPostId === post.id ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                      onClick={handleOnClose}
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => handleOnOpen(post)}
                    >
                      Open
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
