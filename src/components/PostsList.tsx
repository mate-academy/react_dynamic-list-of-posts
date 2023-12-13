/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface Props {
  posts: Post[],
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  const handlePostOpen = useCallback((post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
  }, [selectedPost, setSelectedPost]);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>

            <th />
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            const isSelected = selectedPost?.id !== post.id;

            return (
              <tr
                data-cy="Post"
                key={post.id}
              >
                <td data-cy="PostId">
                  {post.id}
                </td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': isSelected,
                    })}
                    onClick={() => handlePostOpen(post)}
                  >
                    {isSelected ? 'Open' : 'Close'}
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
