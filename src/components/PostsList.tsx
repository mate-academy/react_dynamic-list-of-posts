import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  openedPost?: Post | null;
  setOpenedPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  openedPost,
  setOpenedPost,
}) => {
  const isOpen = (postId: number) => {
    return postId === openedPost?.id;
  };

  const handleOpen = (post: Post) => {
    const definedValue = isOpen(post.id) ? null : post;

    setOpenedPost(definedValue);
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
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': !isOpen(post.id),
                  })}
                  onClick={() => handleOpen(post)}
                >
                  {isOpen(post.id) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
