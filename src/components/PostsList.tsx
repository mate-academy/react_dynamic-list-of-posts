import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../context/ContextReducer';
import cn from 'classnames';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const { Posts, currentPostId } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleOpenClick = (post: Post) => {
    if (currentPostId === post.id) {
      dispatch({ type: 'closePostDetails' });
    } else {
      dispatch({
        type: 'openPostDetails',
        currentId: post.id,
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
          {Posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => handleOpenClick(post)}
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': currentPostId !== post.id,
                  })}
                >
                  {currentPostId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
