import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface PostsListProps {
  posts: Post[];
  selectedPost: Post | null;
  onSelect: (post: Post | null) => void;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  selectedPost,
  onSelect,
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
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">{post.title}</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames('button', 'is-link', {
                  'is-light': post.id !== selectedPost?.id,
                })}
                onClick={() =>
                  onSelect(
                    selectedPost && post.id == selectedPost.id ? null : post,
                  )
                }
              >
                {selectedPost && post.id === selectedPost.id ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
