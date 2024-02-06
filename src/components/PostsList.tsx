/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../AppContext';

export const PostsList: React.FC = () => {
  const {
    selectedUserPosts,
    postActiveId,
    setPostActiveId,
    setIsLoading,
  } = useContext(GlobalContext);

  function handleSelectPost(postId: number) {
    if (postId !== postActiveId) {
      setIsLoading(true);
      setPostActiveId(postId);
    } else {
      setPostActiveId(0);
    }
  }

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
          {selectedUserPosts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => handleSelectPost(post.id)}
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button', 'is-link', { 'is-light': post.id !== postActiveId },
                  )}
                >
                  {post.id === postActiveId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
