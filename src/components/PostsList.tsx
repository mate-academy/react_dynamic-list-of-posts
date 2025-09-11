import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  onSelect: (post: Post) => void;
}

export const PostsList: React.FC<Props> = ({
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
        {posts.map(post => (
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">{post.title}</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={
                  selectedPost && selectedPost.id === post.id
                    ? 'button is-link'
                    : 'button is-link is-light'
                }
                onClick={() => onSelect(post)}
              >
                {selectedPost && selectedPost.id === post.id ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
