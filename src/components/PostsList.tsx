import React, { useMemo } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  selectedUserId: number | null;
  selectedPostId: number | null;
  onPostSelect: (postId: number | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedUserId,
  selectedPostId,
  onPostSelect,
}) => {
  const visiblePosts = useMemo(() => {
    return selectedUserId
      ? posts.filter(post => post.userId === selectedUserId)
      : posts;
  }, [posts, selectedUserId]);

  const handleClick = (postId: number) => {
    onPostSelect(selectedPostId === postId ? null : postId);
  };

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
          {visiblePosts.map(post => {
            const isSelected = selectedPostId === post.id;

            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    onClick={() => handleClick(post.id)}
                    className={classNames('button', 'is-link', {
                      'is-light': !isSelected,
                    })}
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
