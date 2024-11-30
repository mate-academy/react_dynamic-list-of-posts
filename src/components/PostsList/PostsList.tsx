import React from 'react';
import classNames from 'classnames';

import { Post } from '../../types/Post';

type Props = {
  posts: Post[];
  openedPost: Post | null;
  onOpen: (newPost: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({ posts, openedPost, onOpen }) => {
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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': !(openedPost?.id === post.id),
                  })}
                  onClick={() => {
                    if (openedPost?.id === post.id) {
                      onOpen(null);
                    } else {
                      onOpen(post);
                    }
                  }}
                >
                  {openedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
