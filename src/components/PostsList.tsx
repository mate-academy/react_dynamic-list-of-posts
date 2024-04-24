import React from 'react';
import cn from 'classnames';

import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from './GlobalStateProvider';

import * as commentService from '../api/comments';

export const PostsList: React.FC = () => {
  const { userPosts, selectedPost } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const handleOnSelectedPost = (id: number) => {
    if (selectedPost && selectedPost.id === id) {
      dispatch({
        type: 'SET_SELECTED_POST',
        payload: null,
      });

      return;
    }

    dispatch({
      type: 'SET_SELECTED_POST',
      payload: id,
    });

    dispatch({
      type: 'SET_COMMENTS',
      payload: [],
    });

    dispatch({
      type: 'SET_IS_COMMENTS_LOADING',
      payload: true,
    });
    commentService.getComments(id).then(comments => {
      dispatch({
        type: 'SET_SIDEBAR_ERROR',
        payload: null,
      });
      dispatch({
        type: 'SET_COMMENTS',
        payload: comments,
      });

      dispatch({
        type: 'SET_IS_COMMENTS_LOADING',
        payload: false,
      });
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
          {userPosts.map(post => {
            const { id, title } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button', 'is-link', {
                      'is-light': selectedPost?.id !== id,
                    })}
                    onClick={() => handleOnSelectedPost(id)}
                  >
                    {selectedPost?.id === id ? 'Close' : 'Open'}
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
