import React, { useContext, useEffect } from 'react';
import { DispatchContext, StatesContext } from '../context/Store';
import { getPostsByUserId } from '../api/posts';

export const PostsList: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { postsByUserId, selectedUserId, selectedPostId } =
    useContext(StatesContext);

  async function fetchPostsById() {
    dispatch({ type: 'SET_ISLOADING', payload: true });
    if (selectedUserId) {
      const postsFromServer = await getPostsByUserId(selectedUserId);

      if ('Error' in postsFromServer) {
        dispatch({
          type: 'SET_ERRORMESSAGE',
          payload: 'Unable to load posts',
        });
        dispatch({ type: 'SET_ISLOADING', payload: false });

        return;
      }

      dispatch({ type: 'SET_POSTSBYUSERID', payload: postsFromServer });
      dispatch({ type: 'SET_ISLOADING', payload: false });
    }
  }

  useEffect(() => {
    fetchPostsById();
  }, [selectedUserId]);

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
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
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
