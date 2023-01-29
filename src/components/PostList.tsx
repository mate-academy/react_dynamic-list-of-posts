/* eslint-disable no-console */
import React from 'react';
import classNames from 'classnames';

import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  activePost: Post | null,
  onOpeningPostDetails: (post: Post) => void,
};

export const PostList: React.FC<Props> = ({
  posts,
  activePost,
  onOpeningPostDetails,
}) => {
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
          {posts.map(post => {
            const { id, title } = post;
            const isPostActive = activePost?.id === id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>
                <td data-cy="PostTitle">{title}</td>
                <td className="has-text-right is-vcentered">

                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button is-link',
                      {
                        'is-light': !isPostActive,
                      },
                    )}
                    onClick={() => onOpeningPostDetails(post)}
                  >
                    {isPostActive ? 'Close' : 'Open'}
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
