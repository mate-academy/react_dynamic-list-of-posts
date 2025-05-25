import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onPostSelect: (postId: number | null) => void;
  selectedPostId: number | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onPostSelect,
  selectedPostId,
}) => {
  return (
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
          {posts.map(post => {
            const isSelected = selectedPostId === post.id;

            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={`button is-link ${isSelected ? '' : 'is-light'}`}
                    onClick={() => onPostSelect(isSelected ? null : post.id)}
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
};
