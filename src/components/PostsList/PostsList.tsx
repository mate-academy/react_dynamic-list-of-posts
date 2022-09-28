import React from 'react';
import classNames from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  posts: Post[];
  postId: number | null;
  onPost: (id: number | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  postId,
  onPost,
}) => {
  const handleSetOpened = (id: number) => {
    return (postId !== id)
      ? onPost(id)
      : onPost(null);
  };

  return (
    <div data-cy="PostsList">
      <p className="title">
        Posts:
      </p>

      <table
        className="
        table
        is-fullwidth
        is-striped
        is-hoverable
        is-narrow"
      >
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
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
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': !(postId && post.id === postId) },
                  )}
                  onClick={() => handleSetOpened(post.id)}
                >
                  {postId && post.id === postId
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
