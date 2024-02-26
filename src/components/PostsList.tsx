import React from 'react';
import cl from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  currentPost: Post | null;
  setCurrentPost: (p: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  currentPost,
  setCurrentPost,
}) => {
  const selectPost = (post: Post) => {
    if (currentPost?.id === post.id) {
      setCurrentPost(null);

      return;
    }

    setCurrentPost(post);
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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cl('button', 'is-link', {
                    'is-light': currentPost?.id !== post.id,
                  })}
                  onClick={() => selectPost(post)}
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
