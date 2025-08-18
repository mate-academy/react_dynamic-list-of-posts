import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPostId: number | null;
  onToggle: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onToggle,
}) => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th />
        </tr>
      </thead>

      <tbody>
        {posts.map(post => {
          const isOpen = post.id === selectedPostId;

          return (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={`button is-link ${isOpen ? '' : 'is-light'}`}
                  onClick={() => onToggle(post.id)}
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
