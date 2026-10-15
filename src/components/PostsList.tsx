import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface Props {
  posts: Post[];
  selectedPostId: number | null;
  onSelect: (post: number | null) => void;
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {posts.map(post => {
          const { id, title } = post;
          const isSelected = id === selectedPostId;

          return (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">{title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': !isSelected,
                  })}
                  onClick={() => onSelect(isSelected ? null : post.id)}
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
