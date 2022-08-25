import cn from 'classnames';
import React, { useCallback } from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  onOpen: (newPost: number | null) => void;
  selectedPostId: number | null;
}

export const PostsList: React.FC<Props> = ({
  posts,
  onOpen,
  selectedPostId,
}) => {
  const handleOpen = useCallback((postId: number) => {
    if (selectedPostId === postId) {
      onOpen(null);
    } else {
      onOpen(postId);
    }
  }, [selectedPostId]);

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
          {posts.map(({ id, title }) => (
            <tr data-cy="Post" key={id}>
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link',
                    { 'is-light': selectedPostId !== id })}
                  onClick={() => handleOpen(id)}
                >
                  {id === selectedPostId
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
