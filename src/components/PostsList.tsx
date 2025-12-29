import React from 'react';
import { Post } from '../types/Post';

export type Props = {
  posts: Post[];
  selectedPost: Post | null;
  onSelect: (post: Post) => void;
  onClose: () => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSelect,
  onClose,
}) => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {posts.map(post => {
          const isOpen = selectedPost?.id === post.id;

          return (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={`button is-link ${isOpen ? '' : 'is-light'}`}
                  onClick={() => (isOpen ? onClose() : onSelect(post))}
                >
                  {isOpen ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
