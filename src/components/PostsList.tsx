import React, { useContext } from 'react';
import { DispatchContext, StateContext } from './store/store';
import cn from 'classnames';
import { getComments } from '../Api/getItems';

export const PostsList: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { userPosts, activePostId } = useContext(StateContext);

  const handleChosePost = (id: number) => {
    if (activePostId === id) {
      dispatch({ type: 'SET_ACTIVEPOSTID', id: 0 });

      return;
    }

    dispatch({ type: 'SET_COMMENTS', comments: [] });
    dispatch({ type: 'SET_ERRORCOMMENTS', isUse: false });
    dispatch({ type: 'SET_VAITINGCOMMENTS', isUse: true });
    dispatch({ type: 'SET_ACTIVEPOSTID', id: id });

    getComments(id)
      .then(data => dispatch({ type: 'SET_COMMENTS', comments: data }))
      .catch(() => dispatch({ type: 'SET_ERRORCOMMENTS', isUse: true }))
      .finally(() => dispatch({ type: 'SET_VAITINGCOMMENTS', isUse: false }));
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
          {userPosts.map(({ id, title }) => (
            <tr data-cy="Post" key={id}>
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">{title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': activePostId === id,
                  })}
                  onClick={() => handleChosePost(id)}
                >
                  {activePostId === id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
