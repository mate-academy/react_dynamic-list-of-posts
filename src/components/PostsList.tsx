import React, { useContext } from 'react';
import classNames from 'classnames';

import { DispatchContext, StateContext } from './PostsProvider';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const {
    userPosts,
    selectedPost,
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const selectPost = (post: Post, isOpened: boolean) => {
    if (isOpened) {
      dispatch({ type: 'selectPost', payload: null });
    } else {
      dispatch({ type: 'selectPost', payload: post });
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
          {!!userPosts?.length && (
            userPosts.map(post => {
              const { id, title } = post;
              const isOpened = selectedPost?.id === id;

              return (
                <tr
                  data-cy="Post"
                  key={id}
                >
                  <td data-cy="PostId">
                    {id}
                  </td>

                  <td data-cy="PostTitle">
                    {title}
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={
                        classNames(
                          'button is-link',
                          { 'is-light': !isOpened },
                        )
                      }
                      onClick={() => selectPost(post, isOpened)}
                    >
                      {isOpened ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
