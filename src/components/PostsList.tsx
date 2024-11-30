import React, { useCallback } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  onPostSelected: (post: Post | null) => void;
  selectedPostId?: number;
};
export const PostsList: React.FC<Props> = ({
  posts,
  onPostSelected,
  selectedPostId = undefined,
}) => {
  const handleOpenPost = useCallback(
    (post: Post) => {
      if (selectedPostId === post.id) {
        onPostSelected(null);
      } else {
        onPostSelected(post);
      }
    },
    [selectedPostId, onPostSelected],
  );

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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPostId !== post.id,
                  })}
                  onClick={() => handleOpenPost(post)}
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
