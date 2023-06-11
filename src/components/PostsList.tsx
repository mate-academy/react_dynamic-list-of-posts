import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  selectedUserPosts: Post[],
  selectedPostId: number | null,
  onSelectPost: (postId: number | null) => void,
};

export const PostsList: React.FC<Props> = ({
  selectedUserPosts,
  selectedPostId,
  onSelectPost,
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
        {selectedUserPosts.map(post => (
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
                  { 'is-light': post.id !== selectedPostId },
                )}
                onClick={() => onSelectPost(post.id)}
              >
                {selectedPostId === post.id ? 'Close' : 'Open' }
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
