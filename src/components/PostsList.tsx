import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts : Post[] | undefined,
  setActivePost:(post: Post | null) => void,
  activePost: Post | null,
};

export const PostsList: React.FC<Props> = ({
  posts,
  setActivePost,
  activePost,
}) => (
  <div
    data-cy="PostsList"
    style={{ display: !posts?.length ? 'none' : 'block' }}
  >
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
        {posts?.map(post => (
          <tr data-cy="Post" key={post.id}>
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">
              {post.title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={cn(
                  'button',
                  'is-link',
                  { 'is-light': post.id !== activePost?.id },
                )}
                onClick={() => {
                  setActivePost(activePost?.id === post.id ? null : post);
                }}
              >
                {activePost?.id !== post.id ? 'Open' : 'Close'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
