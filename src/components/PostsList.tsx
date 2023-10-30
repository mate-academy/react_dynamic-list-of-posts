import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Prop = {
  posts: Post[] | null,
  handlePostDetailsId: (id: number) => void,
  isPostsId: number | null,
};

export const PostsList: React.FC<Prop> = React.memo(({
  posts,
  handlePostDetailsId,
  isPostsId,
}) => (
  <div
    data-cy="PostsList"
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
          <tr key={post.id} data-cy="Post">
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
                  { 'is-light': isPostsId === post.id },
                )}
                onClick={() => {
                  handlePostDetailsId(post.id);
                }}
              >
                {isPostsId === post.id ? (
                  'close'
                ) : (
                  'open'
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));
