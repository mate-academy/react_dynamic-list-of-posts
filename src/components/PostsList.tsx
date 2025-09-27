import React, { useEffect } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  onSelect: (post: Post | null) => void;
  currentPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelect,
  currentPost,
}) => {
  const STORAGE_KEY = 'currentPostId';

  useEffect(() => {
    const savedId = localStorage.getItem(STORAGE_KEY);

    if (savedId) {
      const post = posts.find(p => p.id === Number(savedId));

      if (post) {
        onSelect(post);
      }
    }
  }, [posts]);

  const handleToggle = (post: Post) => {
    if (currentPost?.id === post.id) {
      localStorage.removeItem(STORAGE_KEY);
      onSelect(null);
    } else {
      localStorage.setItem(STORAGE_KEY, post.id.toString());
      onSelect(post);
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
            <th />
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': currentPost?.id !== post.id,
                    'is-active': currentPost?.id === post.id,
                  })}
                  onClick={() => handleToggle(post)}
                >
                  {currentPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
