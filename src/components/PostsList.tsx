import React, { useContext } from 'react';
import { DispatchContext, StatesContext } from '../context/Store';

export const PostsList: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { postsByUserId, selectedPostId } = useContext(StatesContext);

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
                      onClick={() => {
                        dispatch({
                          type: 'SET_ISSIDEBAROPEN',
                          payload: false,
                        });
                        setTimeout(
                          () =>
                            dispatch({
                              type: 'SET_SELECTEDPOSTID',
                              payload: null,
                            }),
                          450,
                        );
                      }}
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => {
                        dispatch({ type: 'SET_ISSIDEBAROPEN', payload: true });
                        dispatch({
                          type: 'SET_ISCOMMENTFORMACTIVE',
                          payload: false,
                        });
                        dispatch({
                          type: 'SET_SELECTEDPOSTID',
                          payload: post.id,
                        });
                      }}
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
