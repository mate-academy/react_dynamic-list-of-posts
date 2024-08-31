import React from 'react';
import classNames from 'classnames';

import { useAppContext } from '../../BLoC/App/AppContext';

import { Post } from '../../types';

export const PostsList: React.FC = () => {
  const { posts, selectedPost, selectPost, clearPostSelection } =
    useAppContext();

  const handlePostSelect = (post: Post, isSelected: boolean) => {
    if (isSelected) {
      clearPostSelection();
    } else {
      selectPost(post);
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
          {posts.value?.map(post => {
            const isSelected = post.id === selectedPost?.id;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': !isSelected,
                    })}
                    onClick={() => handlePostSelect(post, isSelected)}
                  >
                    {isSelected ? 'Close' : 'Open'}
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
