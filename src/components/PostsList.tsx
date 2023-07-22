import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface Props {
  userPosts: Post[],
  onOpenSidebar: (post: Post) => void;
  selectedPost: Post | null;
}

export const PostsList: React.FC<Props> = ({
  userPosts,
  onOpenSidebar,
  selectedPost,
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
        {userPosts.map(post => (
          <tr data-cy="Post" key={post.id}>
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
                  { 'is-light': selectedPost !== post },
                )}
                onClick={() => onOpenSidebar(post)}
              >
                {selectedPost === post
                  ? 'Close'
                  : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
