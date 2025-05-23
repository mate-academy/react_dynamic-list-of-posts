import React from 'react';

import { Post } from '../types/Post';

interface PostListProps {
  posts: Post[];
  onPostSelect: (post: Post | null) => void;
  selectedPost: Post | null;
}

export const PostsList: React.FC<PostListProps> = ({
  posts,
  onPostSelect,
  selectedPost,
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
          {posts?.map(p => {
            const isSelected = selectedPost?.id === p.id;

            return (
              <tr key={p.id} data-cy="Post">
                <td data-cy="PostId">{p.id}</td>

                <td data-cy="PostTitle">{p.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={`button is-link ${isSelected ? '' : 'is-light'}`}
                    onClick={() => onPostSelect(isSelected ? null : p)}
                    // className="button is-link is-light"
                    // onClick={() => onPostSelect(p)}
                  >
                    {isSelected ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          }) ?? null}
        </tbody>
      </table>
    </div>
  );
};
