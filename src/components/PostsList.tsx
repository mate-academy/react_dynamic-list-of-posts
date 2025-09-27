import React from 'react';
import { Post } from '../types/Post';

interface PostsListProps {
  posts: Post[];
  selectedPostId: number | null;
  onPostSelect: (post: Post) => void;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  selectedPostId,
  onPostSelect,
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
        {posts.map(post => (
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>
            <td data-cy="PostTitle">{post.title}</td>
            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={`button ${selectedPostId === post.id ? 'is-link' : 'is-link is-light'}`}
                onClick={() => onPostSelect(post)}
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
