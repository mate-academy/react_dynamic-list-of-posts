import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  openedPost: Post | null;
  onOpenPost: (post: Post) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  openedPost,
  onOpenPost,
}) => (
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
        {posts.map((post: Post) => (
          <tr data-cy="Post" key={post.id}>
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">{post.title}</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={cn('button is-link', {
                  'is-light': openedPost?.id !== post.id,
                })}
                onClick={() => onOpenPost(post)}
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
