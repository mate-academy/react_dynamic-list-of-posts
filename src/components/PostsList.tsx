import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPostId: number | null;
  onSelect: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onSelect,
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
        {posts.map(post => {
          const isSelected = post.id === selectedPostId;

          return (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={`button is-link ${isSelected ? '' : 'is-light'}`}
                  onClick={() => onSelect(isSelected ? null : post)}
                >
                  {isSelected ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
