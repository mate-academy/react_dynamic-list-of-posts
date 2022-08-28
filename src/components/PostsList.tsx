import React from 'react';

import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[]
  selectedPost: Post | null,
  selectPost: (post: Post | null) => void
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  selectPost,
}) => (
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
        {posts.map(post => (
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">
              {post.title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames(
                  'button',
                  'is-link',
                  { 'is-light': post.id !== selectedPost?.id },
                )}
                onClick={() => {
                  selectPost(post.id === selectedPost?.id ? null : post);
                }}
              >
                {selectedPost?.id === post.id ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
