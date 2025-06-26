import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPostId: number | null;
  onSelect: (postId: number | null) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onSelect,
}) => {
  if (posts.length === 0) {
    return null;
  }

  return (
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
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={`button is-link ${selectedPostId === post.id ? '' : 'is-light'}`}
                  onClick={() =>
                    onSelect(selectedPostId === post.id ? null : post.id)
                  }
                >
                  {selectedPostId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
