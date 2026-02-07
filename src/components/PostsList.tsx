import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
import 'bulma/css/bulma.css';

interface Props {
  posts: Post[];
  selectedPostId: number | null;
  onSelectPost?: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onSelectPost,
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
          const isSelected = selectedPostId === post.id;

          return (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': !isSelected,
                  })}
                  onClick={() => onSelectPost?.(isSelected ? null : post)}
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
