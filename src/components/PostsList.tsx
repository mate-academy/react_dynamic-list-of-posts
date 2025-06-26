import React from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';

type Props = {
  onSelect: (post: Post | null) => void;
  posts: Post[];
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  onSelect,
  posts,
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
          {posts.map(p => (
            <tr data-cy="Post" key={p.id}>
              <td data-cy="PostId">{p.id}</td>

              <td data-cy="PostTitle">{p.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': selectedPost?.id !== p.id,
                  })}
                  onClick={() =>
                    selectedPost?.id === p.id ? onSelect(null) : onSelect(p)
                  }
                >
                  {selectedPost?.id === p.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
