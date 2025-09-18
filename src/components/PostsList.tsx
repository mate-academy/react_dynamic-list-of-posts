import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  setIsSidebarOpen: (value: boolean) => void;
  onSelectedComment: (value: number) => void;
  onSelectedPost: (value: Post) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setIsSidebarOpen,
  onSelectedComment,
  onSelectedPost,
}) => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleClick = (post: Post) => {
    const isOpen = selectedPostId === post.id;

    if (isOpen) {
      setIsSidebarOpen(false);
      setSelectedPostId(null);
    } else {
      setIsSidebarOpen(true);
      setSelectedPostId(post.id);
      onSelectedComment(post.id);
      onSelectedPost(post);
    }
  };

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
            const isOpen = selectedPostId === post.id;

            return (
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
                    onClick={() => handleClick(post)}
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
};

PostsList.displayName = 'PostsList';
